import { PrismaClient } from '@prisma/client';

// 同じクライアントをモジュールにして使いまわす(シングルトン化)
const client = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
export const getPrismaClient = (): PrismaClient => {
  return client;
};
