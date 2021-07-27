import client from "../client";

export default {
  User: {
    isMe: ({ id }, _, { loggedInUser }) => {
      if (loggedInUser) return id === loggedInUser.id;
      else return false;
    },
    recipes: ({ id }) => client.recipe.findMany({ where: { userId: id } }),
    recipesCount: ({ id }) => client.recipe.count({ where: { userId: id } }),
    comments: ({ id }) => client.comment.findMany({ where: { userId: id } }),
    commentsCount: ({ id }) => client.comment.count({ where: { userId: id } }),
  },
};
