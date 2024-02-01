import { test, describe, expect, beforeAll } from '@jest/globals';
import { PrismaClient } from '@prisma/client';
import { resetAndSeedDatabase } from '../../../testsetup/utility';
import { BatchHistoryStore } from '@/store/BatchHistoryStore';
import { now } from '@/utils/time';
import { DateTime } from 'luxon';

const client = new PrismaClient();
const store = new BatchHistoryStore(client);
const fixtures = [
  {
    startAt: now(),
    endAt: DateTime.now().plus({ minutes: 2 }).toJSDate(),
    createdAt: now(),
    updatedAt: DateTime.now().plus({ minutes: 2 }).toJSDate(),
  },
  {
    startAt: now(),
    endAt: DateTime.now().plus({ minutes: 2 }).toJSDate(),
    createdAt: now(),
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
        expect(result?.startAt.toDateString()).toBe(
          fixtures[idx].startAt?.toDateString()
        );
      }
    }
  });
});
