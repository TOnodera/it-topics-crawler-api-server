import { describe, test, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import { app } from '@/app';
import { SITE } from '@/shared';
import { StatusCodes } from 'http-status-codes';
import { getPrismaClient } from '@/store/prismaClient';
import { resetAndSeedDatabase } from '../../testsetup/utility';
import { batchHistorySeeder } from '../../prisma/seeders/batchHistorySeeder';

const client = getPrismaClient();
describe('private apiのテスト', () => {
  beforeAll(async () => {
    return await resetAndSeedDatabase(client);
  });
  test('articles-writer / hostnameがプライベートなドメイン名の場合はステータスコードCREATED', async () => {
    const fixtures = [
      {
        title: 'title',
        content: 'content',
        contentHash: 'content_hash',
        contentId: 'contentId',
        url: 'https://example.com',
        siteId: SITE.QIITA,
      },
    ];
    const responce = await request(app)
      .post('/api-private/articles-writer')
      .send(fixtures)
      .set('host', 'private.api-service');
    expect(responce.status).toBe(StatusCodes.CREATED);
  });
  test('articles-writer / hostnameがプライベートなドメイン名以外の場合はFORBIDDEN', async () => {
    const fixtures = [
      {
        title: 'title',
        content: 'content',
        contentHash: 'content_hash',
        contentId: 'contentId',
        url: 'https://example.com',
        siteId: SITE.QIITA,
      },
    ];
    const responce = await request(app)
      .post('/api-private/articles-writer')
      .send(fixtures)
      .set('host', 'public.api-service');
    expect(responce.status).toBe(StatusCodes.FORBIDDEN);
  });

  test('crawler-stats-writer / hostnameがプライベートなドメイン名の場合はステータスコードCREATED', async () => {
    await batchHistorySeeder(client);
    const fixtures = {
      requestsFinished: 10,
      requestsFailed: 0,
      retryHistogram: [1, 2, 4],
      requestAvgFailedDurationMillis: null,
      requestAvgFinishedDurationMillis: 1000,
      requestsFinishedPerMinute: 3,
      requestsFailedPerMinute: 4,
      requestTotalDurationMillis: 2000,
      requestsTotal: 10,
      crawlerRuntimeMillis: 3000,
      siteId: 3,
      batchHistoryId: 1,
    };
    const responce = await request(app)
      .post('/api-private/crawler-stats-writer')
      .send(fixtures)
      .set('host', 'private.api-service');
    expect(responce.status).toBe(StatusCodes.CREATED);
  });
  test('crawler-stats-writer / hostnameがプライベートなドメイン名以外の場合はFORBIDDEN', async () => {
    const fixtures = {
      requestsFinished: 10,
      requestsFailed: 0,
      retryHistogram: [1, 2, 4],
      requestAvgFailedDurationMillis: null,
      requestAvgFinishedDurationMillis: 1000,
      requestsFinishedPerMinute: 3,
      requestsFailedPerMinute: 4,
      requestTotalDurationMillis: 2000,
      requestsTotal: 10,
      crawlerRuntimeMillis: 3000,
      siteId: 3,
      batchHistoryId: 40,
    };
    const responce = await request(app)
      .post('/api-private/crawler-stats-writer')
      .send(fixtures)
      .set('host', 'public.api-service');
    expect(responce.status).toBe(StatusCodes.FORBIDDEN);
  });

  test('batch-start-writer / hostnameがプライベートなドメイン名の場合はステータスコードCREATED', async () => {
    const responce = await request(app)
      .post('/api-private/batch-start-writer')
      .set('host', 'private.api-service');
    expect(responce.status).toBe(StatusCodes.CREATED);
    const { id }: { id: number } = responce.body;
    expect(typeof id == 'number').toBeTruthy();
  });
  test('batch-end-writer / hostnameがプライベートなドメイン名以外の場合はFORBIDDEN', async () => {
    const response = await request(app)
      .post('/api-private/batch-start-writer')
      .set('host', 'private.api-service');
    expect(response.status).toBe(StatusCodes.CREATED);
    const { id }: { id: number } = response.body;

    const { startAt, endAt, createdAt, updatedAt }: UpdateBatchHistory =
      await request(app)
        .post('/api-private/batch-end-writer')
        .send({ id })
        .set('host', 'private.api-service');

    expect(typeof id).toBeInstanceOf('number');
    expect(typeof startAt).toBeInstanceOf('Date');
    expect(typeof endAt).toBeInstanceOf('Date');
    expect(typeof createdAt).toBeInstanceOf('Date');
    expect(typeof updatedAt).toBeInstanceOf('Date');
  });
});
