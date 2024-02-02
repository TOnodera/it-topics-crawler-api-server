import { privateDomainName } from '@/config';
import { ArticleStore } from '@/store/ArticleStore';
import { BatchHistoryStore } from '@/store/BatchHistoryStore';
import { CrawlerStatsStore } from '@/store/CrawlerStatsStore';
import { getPrismaClient } from '@/store/prismaClient';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const client = getPrismaClient();
export const privateRouter = Router();

privateRouter.use((req, res, next) => {
  if (req.hostname != privateDomainName) {
    res.status(StatusCodes.FORBIDDEN).json({});
    return;
  }
  next();
});

privateRouter.get(
  '/article-reader/:siteId/:contentId',
  async (
    { params }: Request<{ siteId: string; contentId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const store = new ArticleStore(client);
    try {
      const article = await store.getArticleByContentId(
        Number(params.siteId),
        params.contentId
      );
      return res.status(StatusCodes.OK).json(article);
    } catch (e) {
      next(e);
    }
    return res.status(StatusCodes.NOT_FOUND).json();
  }
);

privateRouter.post(
  '/article-writer',
  ({ body }: Request<Article>, res: Response, next: NextFunction) => {
    const store = new ArticleStore(client);
    store
      .createArticle(body)
      .then(() => res.status(StatusCodes.CREATED).json({}))
      .catch(next);
  }
);

privateRouter.post(
  '/articles-writer',
  ({ body }: Request<Article[]>, res: Response, next: NextFunction) => {
    const store = new ArticleStore(client);
    store
      .createArticles(body)
      .then(() => res.status(StatusCodes.CREATED).json({}))
      .catch(next);
  }
);

privateRouter.post(
  '/crawler-stats-writer',
  ({ body }: Request<CrawlerStats>, res: Response, next: NextFunction) => {
    const store = new CrawlerStatsStore(client);
    store
      .createCrawlerStats(body)
      .then(() => res.status(StatusCodes.CREATED).json({}))
      .catch(next);
  }
);

privateRouter.post(
  '/batch-start-writer',
  async (
    _: Request,
    res: Response<BatchStartWriterResponse>,
    next: NextFunction
  ) => {
    const store = new BatchHistoryStore(client);
    try {
      const id = await store.createBatchHistory();
      return res.status(StatusCodes.CREATED).json({ id });
    } catch (e) {
      next(e);
    }
  }
);

privateRouter.post(
  '/batch-end-writer',
  async (
    { body }: Request<UpdateBatchHistory>,
    res: Response<UpdateBatchHistory>,
    next: NextFunction
  ) => {
    const store = new BatchHistoryStore(client);
    try {
      const batchHistory = await store.updateBatchHistory(body.id);
      return res
        .status(StatusCodes.CREATED)
        .json({ id: body.id, ...batchHistory });
    } catch (e) {
      next(e);
    }
  }
);
