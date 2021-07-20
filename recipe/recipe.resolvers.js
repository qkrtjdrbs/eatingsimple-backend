import client from "../client";

export default {
  Recipe: {
    photos: ({ id }) => client.photo.findMany({ where: { recipeId: id } }),
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    comments: ({ id }) =>
      client.comment.findMany({ where: { recipe: { id } } }),
    commentsCount: ({ id }) =>
      client.comment.count({ where: { recipe: { id } } }),
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) return false;
      return userId === loggedInUser.id;
    },
    isLiked: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.recipeLike.findUnique({
        where: {
          recipeId_userId: {
            recipeId: id,
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
    likes: ({ id }) => client.recipeLike.count({ where: { recipeId: id } }),
  },
};
