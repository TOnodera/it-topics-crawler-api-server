import { now } from '@/utils/time';
import { PrismaClient } from '@prisma/client/extension';

export class BatchHistoryStore {
  private client: PrismaClient;
  constructor(client: PrismaClient) {
    this.client = client;
  }
  async createBatchHistory(data?: BatchHistory): Promise<number> {
    const result = await this.client.batchHistory.create({ data });
    return result.id;
  }
  async updateBatchHistory(
    id: number,
    data?: BatchHistory
  ): Promise<BatchHistory> {
    return await this.client.batchHistory.update({
      where: { id },
      data: { ...data, endAt: now(), updatedAt: now() },
    });
  }
  async getBatchHistory(id: number) {
    return await this.client.batchHistory.findUnique({ where: { id } });
  }
}
