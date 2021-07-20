import client from "../../client";

export default {
  Query: {
    seeRecipe: async (_, { id }) => {
      const recipe = await client.recipe.findUnique({ where: { id } });
      if (!recipe) {
        return null;
      }
      return recipe;
    },
  },
};
