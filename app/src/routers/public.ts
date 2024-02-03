import { ArticleStore } from '@/store/ArticleStore';
import { BatchHistoryStore } from '@/store/BatchHistoryStore';
import { getPrismaClient } from '@/store/prismaClient';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';

export const publicRouter = Router();
const client = getPrismaClient();

publicRouter.get('/helthy', (_: Request, res: Response) => {
  res.send('healthy');
});

publicRouter.get('/topics', async (_: Request, res: Response) => {
  const batchHistoryStore = new BatchHistoryStore(client);
  const histories = await batchHistoryStore.getBatchHistoryByWhere({
    orderBy: { createdAt: 'desc' },
    limit: 1,
  });
  if (histories.length == 0) {
    res.status(StatusCodes.NOT_FOUND).send({});
    return;
  }
  const id = histories[0].id;
  const articleStore = new ArticleStore(client);
  const articles = articleStore.getArticles({ batchHistoryId: id });
});
