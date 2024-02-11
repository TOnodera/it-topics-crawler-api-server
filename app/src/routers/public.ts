import { Article } from '@/shared';
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
  (
    { query }: Request<any, any, any, { skip: number; take: number }>,
    res: Response<Article[]>,
    next: NextFunction
  ) => {
    const { skip, take } = query;
    const articleStore = new ArticleStore(client);
    articleStore
      .getArticles({
        skip: Number(skip),
        take: Number(take),
        orderBy: { createdAt: 'desc' },
      })
      .then((articles) => res.json(articles))
      .catch((e) => {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([]);
        next(e);
      });
  }
);

publicRouter.get(
  '/histories',

  (
    { query }: Request<any, any, any, { skip: number; take: number }>,
    res: Response,
    next: NextFunction
  ) => {
    const { skip, take } = query;
    const store = new BatchHistoryStore(client);
    store
      .getAppHistories({
        skip: Number(skip),
        take: Number(take),
        orderBy: { createdAt: 'desc' },
      })
      .then((data) => res.json(data))
      .catch(next);
  }
);
