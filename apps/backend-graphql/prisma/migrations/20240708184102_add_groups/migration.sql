/*
  Warnings:

  - You are about to drop the `_GroupToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";

-- DropTable
DROP TABLE "_GroupToUser";

-- CreateTable
CREATE TABLE "AdminsOnGroup" (
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminsOnGroup_pkey" PRIMARY KEY ("groupId","userId")
);

-- CreateTable
CREATE TABLE "UsersOnGroup" (
    "groupId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnGroup_pkey" PRIMARY KEY ("groupId","userId")
);

-- AddForeignKey
ALTER TABLE "AdminsOnGroup" ADD CONSTRAINT "AdminsOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminsOnGroup" ADD CONSTRAINT "AdminsOnGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGroup" ADD CONSTRAINT "UsersOnGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGroup" ADD CONSTRAINT "UsersOnGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
