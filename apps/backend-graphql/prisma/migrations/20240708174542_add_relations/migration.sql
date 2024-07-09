/*
  Warnings:

  - You are about to drop the column `authorId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Message` table. All the data in the column will be lost.
  - Added the required column `content` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_authorId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "authorId",
DROP COLUMN "text",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
