-- CreateTable
CREATE TABLE "PublicUser" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublicUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taggingQuestionsId" TEXT,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionsAnswers" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "questionsId" TEXT NOT NULL,
    "publicUserId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionsAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaggingQuestions" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaggingQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuestions" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "questionsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserQuestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_taggingQuestionsId_fkey" FOREIGN KEY ("taggingQuestionsId") REFERENCES "TaggingQuestions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswers" ADD CONSTRAINT "QuestionsAnswers_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionsAnswers" ADD CONSTRAINT "QuestionsAnswers_publicUserId_fkey" FOREIGN KEY ("publicUserId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestions" ADD CONSTRAINT "UserQuestions_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestions" ADD CONSTRAINT "UserQuestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
