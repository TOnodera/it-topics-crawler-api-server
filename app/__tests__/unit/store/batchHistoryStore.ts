import { test, describe, expect, beforeAll } from '@jest/globals';
import { BatchHistory, PrismaClient } from '@prisma/client';
import { resetAndSeedDatabase } from '../../../testsetup/utility';
import { BatchHistoryStore } from '@/store/BatchHistoryStore';
import { DateTime } from 'luxon';

const client = new PrismaClient();
const store = new BatchHistoryStore(client);
const fixtures = [
  {
    startAt: new Date(),
    endAt: DateTime.now().plus({ minutes: 2 }).toJSDate(),
    createdAt: new Date(),
    updatedAt: DateTime.now().plus({ minutes: 2 }).toJSDate(),
  },
  {
    startAt: new Date(),
    endAt: DateTime.now().plus({ minutes: 2 }).toJSDate(),
    createdAt: new Date(),
    updatedAt: DateTime.now().plus({ minutes: 2 }).toJSDate(),
  },
  {
    startAt: undefined,
    endAt: undefined,
    createdAt: undefined,
    updatedAt: undefined,
  },
] as unknown as BatchHistory[];

describe('BatchHistoryStoreのテスト', () => {
  beforeAll(async () => {
    return await resetAndSeedDatabase(client);
  });
  test('データの登録ができること', async () => {
    for (const idx in fixtures) {
      await store.createBatchHistory(fixtures[idx]);
      const result = await store.getBatchHistory(Number(idx) + 1);
      if (fixtures[idx].startAt) {
        expect(result?.startAt?.toDateString()).toBe(
          fixtures[idx].startAt?.toDateString()
        );
      }
    }
  });
});
