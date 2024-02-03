/*
  Warnings:

  - Added the required column `batchHistoryId` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "batchHistoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_batchHistoryId_fkey" FOREIGN KEY ("batchHistoryId") REFERENCES "BatchHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
