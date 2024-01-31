import { runSeed } from './seeders';
import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();
runSeed(client)
  .then(() => {
    console.info('シーディングが完了しました');
  })
  .catch((e) => {
    console.error(`シーディング中にエラーが発生しました: ${e}`);
  })
  .finally(async () => {
    await client.$disconnect();
  });
