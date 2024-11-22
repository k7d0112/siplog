/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Report_userId_key" ON "Report"("userId");
