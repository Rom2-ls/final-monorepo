/*
  Warnings:

  - You are about to drop the `AdminsOnGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminsOnGroup" DROP CONSTRAINT "AdminsOnGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "AdminsOnGroup" DROP CONSTRAINT "AdminsOnGroup_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnGroup" DROP CONSTRAINT "UsersOnGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnGroup" DROP CONSTRAINT "UsersOnGroup_userId_fkey";

-- DropTable
DROP TABLE "AdminsOnGroup";

-- DropTable
DROP TABLE "UsersOnGroup";

-- CreateTable
CREATE TABLE "_GroupToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToUser_AB_unique" ON "_GroupToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToUser_B_index" ON "_GroupToUser"("B");

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToUser" ADD CONSTRAINT "_GroupToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
