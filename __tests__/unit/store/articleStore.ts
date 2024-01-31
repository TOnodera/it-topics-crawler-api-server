import { test, describe, expect } from '@jest/globals';
import { ArticleStore } from '@/store/ArticleStore';
import { PrismaClient } from '@prisma/client';
import { resetAndSeedDatabase } from '../../settings/utility';
import { SITE } from '@/shared';

const client = new PrismaClient();
const store = new ArticleStore(client);
const fixture = {
  title: 'test1',
  content: 'content',
  contentHash: 'hash',
  contentId: 'ad9fa9234',
  url: 'https://example.com',
  siteId: 1,
};

describe('articleStoreのテスト', () => {
  beforeAll(async () => {
    return await resetAndSeedDatabase(client);
  });
  test('記事データの登録ができること', async () => {
    await store.createArticle(fixture);
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
        '想定外のエラー: このエラーが出た場合はテストコードに問題があります',
      );
    }
    const updatedArticle = await store.getArticle(1);
    expect(updatedArticle?.id).toBe(1);
    expect(updatedArticle?.title).toBe('test2');
    expect(updatedArticle?.contentHash).toBe('hash2');
  });
});
