/*
  Warnings:

  - You are about to drop the column `nestedCommentId` on the `CommentLike` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentLike" DROP CONSTRAINT "CommentLike_nestedCommentId_fkey";

-- DropIndex
DROP INDEX "CommentLike.nestedCommentId_userId_unique";

-- AlterTable
ALTER TABLE "CommentLike" DROP COLUMN "nestedCommentId";

-- CreateTable
CREATE TABLE "NestedCommentLike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nestedCommentId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NestedCommentLike.nestedCommentId_userId_unique" ON "NestedCommentLike"("nestedCommentId", "userId");

-- AddForeignKey
ALTER TABLE "NestedCommentLike" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NestedCommentLike" ADD FOREIGN KEY ("nestedCommentId") REFERENCES "NestedComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
