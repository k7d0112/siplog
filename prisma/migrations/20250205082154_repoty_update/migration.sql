/*
  Warnings:

  - You are about to drop the column `post_id` on the `Goods` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Goods` table. All the data in the column will be lost.
  - You are about to drop the `ReportCategory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `Goods` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `post_id` on the `Comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `postId` to the `Goods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Goods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReportType" AS ENUM ('HAND_DRIP', 'CAFE');

-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Goods" DROP CONSTRAINT "Goods_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Goods" DROP CONSTRAINT "Goods_user_id_fkey";

-- DropForeignKey
ALTER TABLE "ReportCategory" DROP CONSTRAINT "ReportCategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "ReportCategory" DROP CONSTRAINT "ReportCategory_report_id_fkey";

-- DropIndex
DROP INDEX "Post_postUserId_key";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "post_id",
ADD COLUMN     "post_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Goods" DROP COLUMN "post_id",
DROP COLUMN "user_id",
ADD COLUMN     "postId" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "goodAmount" SET DEFAULT 0,
ALTER COLUMN "commentAmount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "acidity" INTEGER,
ADD COLUMN     "aftertaste" INTEGER,
ADD COLUMN     "aroma" INTEGER,
ADD COLUMN     "beanOrigin" TEXT,
ADD COLUMN     "bitterness" INTEGER,
ADD COLUMN     "cafeName" TEXT,
ADD COLUMN     "cost" INTEGER NOT NULL,
ADD COLUMN     "roastLevel" INTEGER,
ADD COLUMN     "sweetness" INTEGER,
ADD COLUMN     "type" "ReportType" NOT NULL;

-- DropTable
DROP TABLE "ReportCategory";

-- CreateIndex
CREATE UNIQUE INDEX "Goods_userId_postId_key" ON "Goods"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postUserId_fkey" FOREIGN KEY ("postUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goods" ADD CONSTRAINT "Goods_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
