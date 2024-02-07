import { privateDomainName, privateToken } from '@/config';
import { ArticleStore } from '@/store/ArticleStore';
import { BatchHistoryStore, BatchResult } from '@/store/BatchHistoryStore';
import { CrawlerStatsStore } from '@/store/CrawlerStatsStore';
import { getPrismaClient } from '@/store/prismaClient';
import { parseBearerToken } from '@/utils';
import { Article } from '@prisma/client';
import { PrismaClient } from '@prisma/client/extension';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const client = getPrismaClient();
export const privateRouter = Router();

privateRouter.use((req: Request, res, next) => {
  if (
    req.hostname == privateDomainName &&
    parseBearerToken(req.headers.authorization) == privateToken
  ) {
    next();
    return;
  }
  res.sendStatus(StatusCodes.FORBIDDEN);
});

privateRouter.post(
  '/regist',
  async (
    req: Request<any, any, { data: BatchResult }>,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.body.data);
    try {
      const { batchHistory, crawlingResults } = req.body.data;
      client.$transaction(async (tx: PrismaClient) => {
        const batchHistoryStore = new BatchHistoryStore(tx);
        const articleStore = new ArticleStore(tx);
        const crawlerStatsStore = new CrawlerStatsStore(tx);
        const batchHistoryId = await batchHistoryStore.createBatchHistory(
          batchHistory
        );
        for (const result of crawlingResults) {
          await articleStore.createArticles(result.articles, batchHistoryId);
          await crawlerStatsStore.createCrawlerStats(
            result.stats,
            batchHistoryId
          );
        }
        res.status(StatusCodes.CREATED).send({ isError: false });
      });
    } catch (e) {
      console.error(e);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ isError: true });
      next(e);
    }
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
