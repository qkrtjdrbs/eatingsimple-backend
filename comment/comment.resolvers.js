import client from "../client";

export default {
  Comment: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    recipe: ({ recipeId }) =>
      client.recipe.findUnique({ where: { id: recipeId } }),
    nestedComments: ({ id }) =>
      client.nestedComment.findMany({
        where: { nestingId: id },
        orderBy: { createdAt: "asc" },
      }),
    nestedCommentsCount: ({ id }) =>
      client.nestedComment.count({ where: { nestingId: id } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.commentLike.findUnique({
        where: {
          commentId_userId: {
            commentId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
    likes: ({ id }) => client.commentLike.count({ where: { commentId: id } }),
  },
  NestedComment: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.nestedCommentLike.findUnique({
        where: {
          nestedCommentId_userId: {
            nestedCommentId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
    likes: ({ id }) =>
      client.nestedCommentLike.count({ where: { nestedCommentId: id } }),
  },
};
