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
          return null;
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
          return newComment;
        }
        return null;
      }
    ),
  },
};
