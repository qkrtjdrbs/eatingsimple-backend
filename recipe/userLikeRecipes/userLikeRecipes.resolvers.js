import client from "../../client";

export default {
  Query: {
    userLikeRecipes: (_, { id }) =>
      client.recipe.findMany({
        where: { recipeLikes: { some: { userId: id } } },
      }),
  },
};
