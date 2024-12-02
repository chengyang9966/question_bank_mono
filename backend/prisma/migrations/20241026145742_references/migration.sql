/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,questionId]` on the table `UserQuestions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "QuestionsReferences" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "isVideo" BOOLEAN NOT NULL DEFAULT false,
    "isImage" BOOLEAN NOT NULL DEFAULT false,
    "isText" BOOLEAN NOT NULL DEFAULT false,
    "sequence" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsReferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserQuestions_sessionId_questionId_key" ON "UserQuestions"("sessionId", "questionId");

-- AddForeignKey
ALTER TABLE "QuestionsReferences" ADD CONSTRAINT "QuestionsReferences_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
