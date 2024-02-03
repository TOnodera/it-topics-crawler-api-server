import { ArticleStore } from '@/store/ArticleStore';
import { BatchHistoryStore } from '@/store/BatchHistoryStore';
import { getPrismaClient } from '@/store/prismaClient';
import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export const publicRouter = Router();
const client = getPrismaClient();

publicRouter.get('/helthy', (_: Request, res: Response) => {
  res.send('healthy');
});

publicRouter.get(
  '/topics',
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const batchHistoryStore = new BatchHistoryStore(client);
      const histories = await batchHistoryStore.getBatchHistoryByWhere({
        orderBy: { createdAt: 'desc' },
        limit: 1,
      });
      if (histories.length == 0) {
        res.status(StatusCodes.NOT_FOUND).json({});
        return;
      }
      const articleStore = new ArticleStore(client);
      const articles = await articleStore.getArticles({
        batchHistoryId: histories[0].id,
      });
      return res.json(articles);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
      next(e);
    }
  }
);
