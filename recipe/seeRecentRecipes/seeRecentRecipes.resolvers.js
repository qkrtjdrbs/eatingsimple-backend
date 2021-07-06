import client from "../../client";

export default {
  Query: {
    seeRecentRecipes: (_, __) =>
      client.recipe.findMany({
        orderBy: {
          createdAt: "desc",
        },
      }),
  },
};
