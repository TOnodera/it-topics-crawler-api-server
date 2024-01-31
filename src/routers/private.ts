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
  '/stats-writer',
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
  (_: Request, res: Response, next: NextFunction) => {
    const store = new BatchHistoryStore(client);
    store
      .createBatchHistory()
      .then(() => res.status(StatusCodes.CREATED).json({}))
      .catch(next);
  }
);

privateRouter.post(
  '/batch-end-writer',
  (
    { body }: Request<UpdateBatchHistory>,
    res: Response,
    next: NextFunction
  ) => {
    const store = new BatchHistoryStore(client);
    store
      .updateBatchHistory(body.id)
      .then(() => res.status(StatusCodes.CREATED).json({}))
      .catch(next);
  }
);
