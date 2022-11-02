/*
  Warnings:

  - Changed the type of `lessonDate` on the `Lesson` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "lessonDate",
ADD COLUMN     "lessonDate" TIMESTAMP(3) NOT NULL;
