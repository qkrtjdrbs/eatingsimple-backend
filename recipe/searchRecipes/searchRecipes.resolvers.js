import client from "../../client";

export default {
  Query: {
    searchRecipes: async (_, { keyword }) =>
      client.recipe.findMany({
        where: {
          title: {
            contains: keyword,
          },
        },
      }),
  },
};
