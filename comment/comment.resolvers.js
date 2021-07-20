import client from "../client";

export default {
  Comment: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    recipe: ({ recipeId }) =>
      client.recipe.findUnique({ where: { id: recipeId } }),
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
};
