import { PrismaClient } from '@prisma/client';

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
