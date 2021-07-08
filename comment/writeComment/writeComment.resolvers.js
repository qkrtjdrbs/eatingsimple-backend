import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    writeComment: protectedResolver(
      async (_, { recipeId, payload }, { loggedInUser }) => {
        const existRecipe = await client.recipe.findUnique({
          where: { id: recipeId },
        });
        if (!existRecipe) {
          return {
            ok: false,
            error: "Recipe not exist.",
          };
        }
        const newComment = await client.comment.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            recipe: {
              connect: {
                id: recipeId,
              },
            },
            payload,
          },
        });
        if (newComment) {
          return {
            ok: true,
            id: newComment.id,
          };
        }
        return {
          ok: false,
          error: "Fail to write comment",
        };
      }
    ),
  },
};
