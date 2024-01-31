import { PrismaClient } from '@prisma/client';
import { siteSeeder } from './siteSeeder';

export const runSeed = (client: PrismaClient) => {
  return Promise.all([siteSeeder(client)]);
};
