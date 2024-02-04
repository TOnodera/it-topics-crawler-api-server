import { privateDomainName } from '@/config';
import { ArticleStore } from '@/store/ArticleStore';
import { BatchHistoryStore } from '@/store/BatchHistoryStore';
import { CrawlerStatsStore } from '@/store/CrawlerStatsStore';
import { getPrismaClient } from '@/store/prismaClient';
import { PrismaClient } from '@prisma/client/extension';
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

privateRouter.post(
  '/regist',
  async (
    { body }: Request<CrawlingResult[]>,
    res: Response,
    next: NextFunction
  ) => {
    client.$transaction(async (tx: PrismaClient) => {
      const articleStore = new ArticleStore(tx);
      const crawlerStatsStore = new CrawlerStatsStore(tx);
      for (const result of body.data) {
        await articleStore.createArticles(result.articles);
        await crawlerStatsStore.createCrawlerStats(result.stats);
      }
    });
    try {
      res.status(StatusCodes.CREATED).send({ isError: false });
    } catch (e) {
      res.status(StatusCodes.CREATED).send({ isError: true });
      next(e);
    }
  }
);

privateRouter.post(
  '/batch-start',
  (_: Request, res: Response<BatchStartWriterResponse>, next: NextFunction) => {
    const store = new BatchHistoryStore(client);
    store
      .createBatchHistory()
      .then((id) => res.status(StatusCodes.CREATED).json({ id }))
      .catch(next);
  }
);

privateRouter.post(
  '/batch-end',
  (
    { body }: Request<UpdateBatchHistory>,
    res: Response<UpdateBatchHistory>,
    next: NextFunction
  ) => {
    const store = new BatchHistoryStore(client);
    store
      .updateBatchHistory(body.id)
      .then((batchHistory) =>
        res.status(StatusCodes.OK).json({ ...batchHistory, id: body.id })
      )
      .catch(next);
  }
);

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
