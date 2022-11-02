/*
  Warnings:

  - You are about to drop the column `teacherId` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `teacherName` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_teacherId_fkey";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "teacherId",
ADD COLUMN     "teacherName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_teacherName_fkey" FOREIGN KEY ("teacherName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
