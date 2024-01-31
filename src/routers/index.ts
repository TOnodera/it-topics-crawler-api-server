import { ArticleStore } from "@/store/ArticleStore";
import { getPrismaClient } from "@/store/prismaClient";
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

export const router = Router();
const client = getPrismaClient();

router.post(
  "/articles-writer",
  (
    { body }: Request<Article[]>,
    res: Response<Article>,
    next: NextFunction
  ) => {
    const store = new ArticleStore(client);
    store
      .createArticles(body)
      .then(() => res.status(StatusCodes.CREATED))
      .catch(next);
  }
);
