import client from "../../client";

export default {
  Query: {
    userCommentingRecipes: (_, { username }) =>
      client.recipe.findMany({
        where: { comments: { some: { user: { username } } } },
      }),
  },
};
