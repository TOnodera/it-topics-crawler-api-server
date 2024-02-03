import { SITE } from '@/shared';
import { now } from '@/utils/time';
import { PrismaClient } from '@prisma/client';

export interface Where {
  id?: number;
  title?: string;
  content?: string;
  contentHash?: string;
  published?: boolean;
  siteId?: number;
}

export class ArticleStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  createArticle = async (data: NewArticle) => {
    await this.client.article.create({ data: { ...data, published: true } });
  };

  createArticles = async (data: NewArticle[]) => {
    await this.client.article.createMany({ data });
  };

  updateArticle = async (data: Article) => {
    await this.client.article.update({
      where: { id: data.id },
      data: { ...data, updatedAt: now() },
    });
  };

  getArticle = async (id: number): Promise<Article | null> => {
    return await this.client.article.findUnique({ where: { id } });
  };

  getArticles = async (where?: Where): Promise<Article[]> => {
    return await this.client.article.findMany({ where });
  };

  getArticleByContentId = async (
    siteId: SITE,
    contentId: string
  ): Promise<Article | null> => {
    return await this.client.article.findFirst({ where: { contentId, siteId } });
  };
}
