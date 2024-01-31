import { test, describe, expect } from '@jest/globals';
import { ArticleStore } from '@/store/ArticleStore';
import { PrismaClient } from '@prisma/client';
import { resetAndSeedDatabase } from '../../__settings__/utility';
import { SITE } from '@/shared';

const client = new PrismaClient();
const store = new ArticleStore(client);
const fixtures = [
  {
    title: 'test1',
    content: 'content',
    contentHash: 'hash',
    contentId: 'ad9fa9234',
    url: 'https://example1.com',
    siteId: 1,
  },
  {
    title: 'test2',
    content: 'content2',
    contentHash: 'hash2',
    contentId: 'ad9fa92342',
    url: 'https://example2.com',
    siteId: 2,
  },
  {
    title: 'test3',
    content: 'content3',
    contentHash: 'hash3',
    contentId: 'ad9fa92343',
    url: 'https://example3.com',
    siteId: 3,
  },
];

describe('articleStoreのテスト', () => {
  beforeAll(async () => {
    return await resetAndSeedDatabase(client);
  });
  test('記事データの登録ができること', async () => {
    await store.createArticle(fixtures[0]);
    const article = await store.getArticle(1);
    expect(article?.id).toBe(1);
    expect(article?.title).toBe('test1');
    expect(article?.contentHash).toBe('hash');
  });
  test('記事データをIDで取得できること', async () => {
    const article = await store.getArticle(1);
    expect(article?.id).toBe(1);
    expect(article?.title).toBe('test1');
    expect(article?.contentHash).toBe('hash');
  });
  test('記事データをcontentId,siteIdで取得できること', async () => {
    const article = await store.getArticleByContentId(SITE.QIITA, 'ad9fa9234');
    expect(article?.id).toBe(1);
    expect(article?.title).toBe('test1');
    expect(article?.contentHash).toBe('hash');
  });
  test('記事データの更新ができること', async () => {
    const article = await store.getArticle(1);
    if (article) {
      await store.updateArticle({
        ...article,
        title: 'test2',
        contentHash: 'hash2',
      });
    } else {
      throw new Error(
        '想定外のエラー: このエラーが出た場合はテストコードに問題があります'
      );
    }
    const updatedArticle = await store.getArticle(1);
    expect(updatedArticle?.id).toBe(1);
    expect(updatedArticle?.title).toBe('test2');
    expect(updatedArticle?.contentHash).toBe('hash2');
  });
  test('記事データの登録ができること', async () => {
    await store.createArticles(fixtures);
    const articles = await store.getArticles();
    expect(articles.length).toBe(fixtures.length + 1);
  });
});
