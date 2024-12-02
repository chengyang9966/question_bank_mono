/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PublicUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PublicUser_email_key" ON "PublicUser"("email");
