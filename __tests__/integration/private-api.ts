import { describe, test, expect } from '@jest/globals';
import { request } from 'supertest';
import { app } from '@/app';

describe('private apiのテスト', () => {
  test('hostnameがプライベートなドメイン名でない場合はエラー', async () => {
    const responce = await request(app);
  });
});
