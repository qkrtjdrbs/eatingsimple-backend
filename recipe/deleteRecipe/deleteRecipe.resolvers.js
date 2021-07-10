import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deleteRecipe: protectedResolver(async (_, { id }) => {
      try {
        const comments = await client.comment.findMany({
          where: { recipeId: id },
        });
        //comment likes delete
        comments?.forEach(
          async (comment) =>
            await client.commentLike.deleteMany({
              where: {
                commentId: comment.id,
              },
            })
        );
        //comments delete
        await client.comment.deleteMany({
          where: { recipeId: id },
        });
        //recipe likes delete
        await client.recipeLike.deleteMany({
          where: {
            recipeId: id,
          },
        });
        //photos delete
        await client.photo.deleteMany({
          where: { recipeId: id },
        });
        //recipe delete
        await client.recipe.delete({
          where: { id },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    }),
  },
};
