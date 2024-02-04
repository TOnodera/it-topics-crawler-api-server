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
  (
    { params }: Request<{ siteId: string; contentId: string }>,
    res: Response<Article | null>,
    next: NextFunction
  ) => {
    const store = new ArticleStore(client);
    store
      .getArticleByContentId(Number(params.siteId), params.contentId)
      .then((article) => {
        res.status(StatusCodes.OK).json(article);
      })
      .catch(next);
  }
);

privateRouter.post(
  '/regist',
  (
    { body }: Request<any, any, CrawlingResult[]>,
    res: Response,
    next: NextFunction
  ) => {
    const articleStore = new ArticleStore(client);
    const crawlerStatsStore = new CrawlerStatsStore(client);

    for (const result of body) {
      articleStore
        .createArticles(result.articles)
        .then(() => res.status(StatusCodes.CREATED).json({}))
        .catch(next);
      crawlerStatsStore
        .createCrawlerStats(result.stats)
        .then(() => res.status(StatusCodes.CREATED).json({}))
        .catch(next);
    }
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
      return res.status(StatusCodes.OK).json({ ...batchHistory, id: body.id });
    } catch (e) {
      next(e);
    }
  }
);
