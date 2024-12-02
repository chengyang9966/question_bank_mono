/*
  Warnings:

  - A unique constraint covering the columns `[tag]` on the table `TaggingQuestions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TaggingQuestions_tag_key" ON "TaggingQuestions"("tag");
