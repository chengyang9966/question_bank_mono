/*
  Warnings:

  - The primary key for the `PublicUser` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "PublicUserAnswers" DROP CONSTRAINT "PublicUserAnswers_publicUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserQuestions" DROP CONSTRAINT "UserQuestions_userId_fkey";

-- AlterTable
ALTER TABLE "PublicUser" DROP CONSTRAINT "PublicUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "PublicUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PublicUser_id_seq";

-- AlterTable
ALTER TABLE "PublicUserAnswers" ALTER COLUMN "publicUserId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserQuestions" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "UserQuestions" ADD CONSTRAINT "UserQuestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicUserAnswers" ADD CONSTRAINT "PublicUserAnswers_publicUserId_fkey" FOREIGN KEY ("publicUserId") REFERENCES "PublicUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
