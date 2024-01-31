import { PrismaClient } from "@prisma/client";

// 同じクライアントをモジュールにして使いまわす(シングルトン化)
const client = new PrismaClient();
export const getPrismaClient = (): PrismaClient => {
  return client;
};
