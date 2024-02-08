import { Article, ArticleStore } from '@/store/ArticleStore';
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
  async (
    { query }: Request<any, any, any, { skip: number; take: number }>,
    res: Response<Article[]>,
    next: NextFunction
  ) => {
    try {
      const { skip, take } = query;
      const articleStore = new ArticleStore(client);
      const articles = await articleStore.getArticles({
        skip: Number(skip),
        take: Number(take),
        orderBy: { createdAt: 'desc' },
      });
      console.log(skip, take);
      res.json(articles);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([]);
      next(e);
    }
  }
);
