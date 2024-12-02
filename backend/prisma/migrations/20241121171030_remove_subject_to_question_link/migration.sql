/*
  Warnings:

  - You are about to drop the column `subjectId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_subjectId_fkey";

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "subjectId";

-- CreateTable
CREATE TABLE "_QuestionToSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuestionToSubject_AB_unique" ON "_QuestionToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_QuestionToSubject_B_index" ON "_QuestionToSubject"("B");

-- AddForeignKey
ALTER TABLE "_QuestionToSubject" ADD CONSTRAINT "_QuestionToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuestionToSubject" ADD CONSTRAINT "_QuestionToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
