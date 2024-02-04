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
  async getBatchHistory(id: number): Promise<RegisteredBatchHistory> {
    return await this.client.batchHistory.findUnique({ where: { id } });
  }
}
