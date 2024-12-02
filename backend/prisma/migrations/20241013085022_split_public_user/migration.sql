/*
  Warnings:

  - You are about to drop the column `publicUserId` on the `QuestionsAnswers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionsAnswers" DROP CONSTRAINT "QuestionsAnswers_publicUserId_fkey";

-- AlterTable
ALTER TABLE "QuestionsAnswers" DROP COLUMN "publicUserId";

-- CreateTable
CREATE TABLE "PublicUserAnswers" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "publicUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicUserAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PublicUserAnswers" ADD CONSTRAINT "PublicUserAnswers_publicUserId_fkey" FOREIGN KEY ("publicUserId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
