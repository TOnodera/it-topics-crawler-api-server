import { SITE } from '@/shared';
import { PrismaClient } from '@prisma/client';
import { NewArticle } from './ArticleStore';

export interface CrawlingResult {
  siteId: SITE;
  articles: NewArticle[];
  stats: CrawlerStats;
}

export interface CrawlerStats {
  requestsFinished: number | null;
  requestsFailed: number | null;
  retryHistogram: number[];
  requestAvgFailedDurationMillis: number | null;
  requestAvgFinishedDurationMillis: number | null;
  requestsFinishedPerMinute: number | null;
  requestsFailedPerMinute: number | null;
  requestTotalDurationMillis: number | null;
  requestsTotal: number | null;
  crawlerRuntimeMillis: number | null;
  siteId: SITE;
}

export class CrawlerStatsStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  async createCrawlerStats(data: CrawlerStats, batchHistoryId: number) {
    await this.client.crawlerStats.create({
      data: { ...data, batchHistoryId },
    });
  }
  async getCrawlerStats(id: number) {
    return await this.client.crawlerStats.findUnique({ where: { id } });
  }
}
