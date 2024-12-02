/*
  Warnings:

  - You are about to drop the column `publicUserId` on the `PublicUserAnswers` table. All the data in the column will be lost.
  - You are about to drop the column `questionsId` on the `UserQuestions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `UserQuestions` table. All the data in the column will be lost.
  - Added the required column `userQuestionId` to the `PublicUserAnswers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionId` to the `UserQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `UserQuestions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PublicUserAnswers" DROP CONSTRAINT "PublicUserAnswers_publicUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestions" DROP CONSTRAINT "UserQuestions_questionsId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestions" DROP CONSTRAINT "UserQuestions_userId_fkey";

-- AlterTable
ALTER TABLE "PublicUserAnswers" DROP COLUMN "publicUserId",
ADD COLUMN     "userQuestionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserQuestions" DROP COLUMN "questionsId",
DROP COLUMN "userId",
ADD COLUMN     "questionId" TEXT NOT NULL,
ADD COLUMN     "sessionId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PublicUserSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicUserSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserQuestions" ADD CONSTRAINT "UserQuestions_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "PublicUserSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestions" ADD CONSTRAINT "UserQuestions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicUserAnswers" ADD CONSTRAINT "PublicUserAnswers_userQuestionId_fkey" FOREIGN KEY ("userQuestionId") REFERENCES "UserQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicUserSession" ADD CONSTRAINT "PublicUserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
