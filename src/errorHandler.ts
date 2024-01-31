import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR);
  res.json({ error });
};
