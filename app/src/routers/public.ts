import { Request, Response, Router } from 'express';

export const publicRouter = Router();

publicRouter.get('/helthy', (_: Request, res: Response) => {
  res.send('healthy');
});
