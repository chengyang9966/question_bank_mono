/*
  Warnings:

  - Added the required column `new_data` to the `AuditLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `old_data` to the `AuditLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "new_data" JSONB NOT NULL,
ADD COLUMN     "old_data" JSONB NOT NULL;
