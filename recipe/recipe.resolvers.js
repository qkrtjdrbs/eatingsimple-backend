import client from "../client";

const DELETED_COMMENT = "[삭제된 댓글입니다]";

export default {
  Recipe: {
    photos: ({ id }) => client.photo.findMany({ where: { recipeId: id } }),
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    comments: ({ id }) =>
      client.comment.findMany({
        where: { recipe: { id } },
        orderBy: { createdAt: "asc" },
      }),
    commentsCount: async ({ id }) => {
      const comment = await client.comment.findMany({
        where: { recipeId: id, payload: { not: DELETED_COMMENT } },
      });
      return comment.length;
    },
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
