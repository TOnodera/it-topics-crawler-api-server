import { SITE } from '@/shared';
import { now } from '@/utils/time';
import { Article, PrismaClient } from '@prisma/client';

export class ArticleStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  createArticle = async (data: NewArticle) => {
    await this.client.article.create({ data: { ...data, published: true } });
  };

  updateArticle = async (data: Article) => {
    await this.client.article.update({
      where: { id: data.id },
      data: { ...data, updatedAt: now() },
    });
  };

  getArticle = async (id: number): Promise<Article | null> => {
    return this.client.article.findUnique({ where: { id } });
  };
  getArticleByContentId = async (
    siteId: SITE,
    contentId: string,
  ): Promise<Article | null> => {
    return this.client.article.findFirst({ where: { contentId, siteId } });
  };
}
