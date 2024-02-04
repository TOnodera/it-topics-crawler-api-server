import { ArticleStore } from '@/store/ArticleStore';
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
      const articleStore = new ArticleStore(client);
      const articles = await articleStore.getArticles();
      return res.json(articles);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({});
      next(e);
    }
  }
);
