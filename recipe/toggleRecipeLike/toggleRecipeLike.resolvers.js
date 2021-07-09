import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    toggleRecipeLike: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const recipe = await client.recipe.findUnique({ where: { id } });
      if (!recipe) {
        return {
          ok: false,
          error: "Recipe not exist",
        };
      }
      const like = await client.recipeLike.findUnique({
        where: {
          recipeId_userId: {
            recipeId: id,
            userId: loggedInUser.id,
          },
        },
      });
      if (like) {
        await client.recipeLike.delete({ where: { id: like.id } });
      } else {
        await client.recipeLike.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            recipe: {
              connect: {
                id,
              },
            },
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
