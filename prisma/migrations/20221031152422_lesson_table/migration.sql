/*
  Warnings:

  - You are about to drop the column `name` on the `Lesson` table. All the data in the column will be lost.
  - Added the required column `date` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offerId` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lesson" DROP COLUMN "name",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "offerId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
