import { PrismaClient } from '@prisma/client';
import { exec } from 'child_process';
import { runSeed } from '../prisma/seeders/seeders';

export const seedDatabase = async (client: PrismaClient) => {
  if (process.env.NODE_ENV == 'production') {
    throw new Error('本番環境ではこの操作は行えません');
  }

  try {
    await runSeed(client);
  } catch (error) {
    console.error({ error });
  }
};

export const truncate = async (client: PrismaClient) => {
  const tablenames: { tablename: string }[] = await client.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ');

  try {
    await client.$executeRawUnsafe(
      `TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`
    );
  } catch (error) {
    console.log({ error });
  }
};

export const resetDatabase = async (): Promise<void> => {
  if (process.env.NODE_ENV == 'production') {
    throw new Error('本番環境ではデータベースの削除は行えません');
  }

  const prismaPath = '../../node_modules/.bin/prisma';
  await exec(`${prismaPath} migrate reset --force`);
};

export const resetAndSeedDatabase = async (client: PrismaClient) => {
  await truncate(client);
  await seedDatabase(client);
};
