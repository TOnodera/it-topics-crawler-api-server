import { PrismaClient } from '@prisma/client';

export class CrawlerStatsStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  async createCrawlerStats(data: CrawlerStats) {
    await this.client.crawlerStats.create({ data });
  }
  async getCrawlerStats(id: number) {
    return await this.client.crawlerStats.findUnique({ where: { id } });
  }
}
