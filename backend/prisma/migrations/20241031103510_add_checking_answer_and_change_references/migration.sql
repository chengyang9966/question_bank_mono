/*
  Warnings:

  - You are about to drop the column `questionId` on the `QuestionsReferences` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionsReferences" DROP CONSTRAINT "QuestionsReferences_questionId_fkey";

-- AlterTable
ALTER TABLE "PublicUserAnswers" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "QuestionsReferences" DROP COLUMN "questionId";

-- CreateTable
CREATE TABLE "_QuestionsToQuestionsReferences" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionsToQuestionsReferences_AB_unique" ON "_QuestionsToQuestionsReferences"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionsToQuestionsReferences_B_index" ON "_QuestionsToQuestionsReferences"("B");

-- AddForeignKey
ALTER TABLE "_QuestionsToQuestionsReferences" ADD CONSTRAINT "_QuestionsToQuestionsReferences_A_fkey" FOREIGN KEY ("A") REFERENCES "Questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionsToQuestionsReferences" ADD CONSTRAINT "_QuestionsToQuestionsReferences_B_fkey" FOREIGN KEY ("B") REFERENCES "QuestionsReferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
