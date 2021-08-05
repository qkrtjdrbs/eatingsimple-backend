/*
  Warnings:

  - A unique constraint covering the columns `[nestedCommentId,userId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_id_fkey";

-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "nestedCommentId" INTEGER;

-- CreateTable
CREATE TABLE "NestedComment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "payload" TEXT NOT NULL,
    "nestingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike.nestedCommentId_userId_unique" ON "CommentLike"("nestedCommentId", "userId");

-- AddForeignKey
ALTER TABLE "CommentLike" ADD FOREIGN KEY ("nestedCommentId") REFERENCES "NestedComment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NestedComment" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NestedComment" ADD FOREIGN KEY ("nestingId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
