import client from "../../client";

export default {
  Query: {
    seeRecentRecipe: (_, __) =>
      client.recipe.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
