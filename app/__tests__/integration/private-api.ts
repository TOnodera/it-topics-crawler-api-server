import { describe, test, expect, beforeAll } from '@jest/globals';
import request from 'supertest';
import { app } from '@/app';
import { SITE } from '@/shared';
import { StatusCodes } from 'http-status-codes';
import { getPrismaClient } from '@/store/prismaClient';
import { resetAndSeedDatabase } from '../../testsetup/utility';
import { batchHistorySeeder } from '../../prisma/seeders/batchHistorySeeder';
import { BatchResult } from '@/store/BatchHistoryStore';
import { NewArticle } from '@/store/ArticleStore';

const client = getPrismaClient();
describe('private apiのテスト', () => {
  beforeAll(async () => {
    return await resetAndSeedDatabase(client);
  });

  test('crawler-stats-writer / hostnameがプライベートなドメイン名の場合はステータスコードCREATED', async () => {
    await batchHistorySeeder(client);
    const fixtures = {
      crawlingResults: [
        {
          articles: [
            {
              title: 'title1',
              content: 'content1',
              contentHash: 'content_hash1',
              contentId: 'contentId1',
              url: 'https://example1.com',
              siteId: SITE.QIITA,
              ogpTitle: 'ogpTitle',
              ogpImage: 'ogpImage',
              ogpDescription: 'ogpDesc',
            },
            {
              title: 'title2',
              content: 'content2',
              contentHash: 'content_hash2',
              contentId: 'contentId2',
              url: 'https://example2.com',
              siteId: SITE.QIITA,
            },
          ],
          stats: {
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
          },
        },
      ],
      batchHistory: { startAt: new Date(), endAt: new Date() },
    } as BatchResult;
    const responce = await request(app)
      .post('/api-private/regist')
      .send({ data: fixtures })
      .set('host', 'private.api-service');
    expect(responce.status).toBe(StatusCodes.CREATED);
  });
  test('crawler-stats-writer / hostnameがパブリックなドメイン名の場合はステータスコードFORBIDDEN', async () => {
    await batchHistorySeeder(client);
    const fixtures = {
      crawlingResults: [
        {
          articles: [
            {
              title: 'title1',
              content: 'content1',
              contentHash: 'content_hash1',
              contentId: 'contentId1',
              url: 'https://example1.com',
              siteId: SITE.QIITA,
              ogpTitle: 'ogpTitle',
              ogpImage: 'ogpImage',
              ogpDescription: 'ogpDesc',
            },
            {
              title: 'title2',
              content: 'content2',
              contentHash: 'content_hash2',
              contentId: 'contentId2',
              url: 'https://example2.com',
              siteId: SITE.QIITA,
            },
          ],
          stats: {
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
          },
        },
      ],
      batchHistory: { startAt: new Date(), endAt: new Date() },
    } as BatchResult;
    const responce = await request(app)
      .post('/api-private/regist')
      .send({ data: fixtures })
      .set('host', 'public.api-service');
    expect(responce.status).toBe(StatusCodes.FORBIDDEN);
  });
  test('crawler-stats-writer / articlesが空の場合でも処理できること', async () => {
    await batchHistorySeeder(client);
    const fixtures = {
      crawlingResults: [
        {
          articles: [] as NewArticle[],
          stats: {
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
          },
        },
      ],
      batchHistory: { startAt: new Date(), endAt: new Date() },
    } as BatchResult;
    const responce = await request(app)
      .post('/api-private/regist')
      .send({ data: fixtures })
      .set('host', 'private.api-service');
    expect(responce.status).toBe(StatusCodes.CREATED);
  });
});
