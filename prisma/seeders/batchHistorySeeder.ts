import { PrismaClient } from '@prisma/client';
import { BatchHistoryStore } from '@/store/BatchHistoryStore';

/**
 * この関数はテスト時以外使用できません
 * @param client
 * @param rowNum
 */
export const batchHistorySeeder = async (
  client: PrismaClient,
  rowNum: number = 2,
) => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('テスト時以外は使用できません');
  }
  const store = new BatchHistoryStore(client);
  for (let i = 0; i < rowNum; i++) {
    await store.createBatchHistory();
  }
};
