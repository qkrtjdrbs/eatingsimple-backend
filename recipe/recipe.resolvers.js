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
    likes: ({ id }) => client.recipeLike.count({ where: { recipeId: id } }),
  },
};
