/*
  Warnings:

  - You are about to drop the column `thumbnailUrl` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "thumbnailUrl",
ADD COLUMN     "thumbnailImageKey" TEXT;
