-- AlterTable
ALTER TABLE "QuestionsAnswers" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sequence" INTEGER NOT NULL DEFAULT 1;
