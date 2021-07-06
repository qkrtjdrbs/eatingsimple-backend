import client from "../client";

export default {
  Photo: {
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    recipe: ({ recipeId }) =>
      client.recipe.findUnique({ where: { id: recipeId } }),
  },
};
