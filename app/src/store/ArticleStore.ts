import { Article, SITE } from '@/shared';
import { PrismaClient } from '@prisma/client';

export interface NewArticle {
  title: string;
  siteId: number;
  content: string;
  contentHash: string;
  url: string;
  contentId: string;
  ogpTitle: string | null;
  ogpImage: string | null;
  ogpDescription: string | null;
}

export class ArticleStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }

  createArticles = async (datas: NewArticle[], batchHistoryId: number) => {
    const newDatas = datas.map((v) => {
      return {
        ...v,
        batchHistoryId,
      };
    });
    console.log('id: ', batchHistoryId);
    console.log(newDatas);
    await this.client.article.createMany({ data: newDatas });
  };

  updateArticle = async (data: Article) => {
    await this.client.article.update({
      where: { id: data.id },
      data: { ...data, updatedAt: new Date() },
    });
  };

  getArticle = async (id: number): Promise<Article | null> => {
    return await this.client.article.findUnique({ where: { id } });
  };

  getArticles = async (where?: any): Promise<Article[]> => {
    return await this.client.article.findMany(where);
  };

  getArticleByContentId = async (
    siteId: SITE,
    contentId: string
  ): Promise<Article | null> => {
    return await this.client.article.findFirst({
      where: { contentId, siteId },
    });
  };
}
