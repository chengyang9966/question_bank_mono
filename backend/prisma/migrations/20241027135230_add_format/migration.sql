/*
  Warnings:

  - You are about to drop the column `isImage` on the `QuestionsReferences` table. All the data in the column will be lost.
  - You are about to drop the column `isText` on the `QuestionsReferences` table. All the data in the column will be lost.
  - You are about to drop the column `isVideo` on the `QuestionsReferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "QuestionsReferences" DROP COLUMN "isImage",
DROP COLUMN "isText",
DROP COLUMN "isVideo",
ADD COLUMN     "format" TEXT NOT NULL DEFAULT 'text';
