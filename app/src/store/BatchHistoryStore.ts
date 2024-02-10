import { PrismaClient } from '@prisma/client/extension';
import { CrawlingResult } from './CrawlerStatsStore';
import { AppHistories, RegisteredBatchHistory } from '@/shared';

export interface BatchHistory {
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BatchResult {
  crawlingResults: CrawlingResult[];
  batchHistory: BatchHistory;
}

export interface UpdateBatchHistory {
  id: number;
  startAt?: Date;
  endAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BatchHistoryStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  async createBatchHistory(data?: BatchHistory): Promise<number> {
    const result = await this.client.batchHistory.create({ data });
    return result.id;
  }
  async getBatchHistory(id: number): Promise<RegisteredBatchHistory> {
    return await this.client.batchHistory.findUnique({ where: { id } });
  }
  async getAppHistories(): Promise<AppHistories[]> {
    return await this.client.batchHistory.findMany({
      include: {
        CrawlerStats: {
          include: { Site: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
