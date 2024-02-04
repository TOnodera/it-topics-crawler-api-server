import { SITE } from '@/shared';
import { PrismaClient } from '@prisma/client';

export interface Where {
  id?: number;
  title?: string;
  content?: string;
  contentHash?: string;
  published?: boolean;
  siteId?: number;
  batchHistoryId: number;
}

export interface NewArticle {
  title: string;
  siteId: number;
  content: string;
  contentHash: string;
  url: string;
  contentId: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  contentHash: string;
  published: boolean;
  siteId: number;
  batchHistoryId: number;
  createdAt: Date;
  updatedAt: Date;
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

  getArticles = async (where?: Where): Promise<Article[]> => {
    return await this.client.article.findMany({ where });
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
