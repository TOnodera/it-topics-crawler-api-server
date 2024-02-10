/*
  Warnings:

  - Added the required column `name_ja` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Site" ADD COLUMN     "name_ja" VARCHAR(255) NOT NULL;
