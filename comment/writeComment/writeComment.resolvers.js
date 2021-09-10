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
        if (payload === "[삭제된 댓글입니다]") return null;
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
          const newNotification = await client.notification.create({
            data: {
              user: {
                connect: {
                  id: existRecipe.userId,
                },
              },
            },
          });
          await client.message.create({
            data: {
              kind: "newComment",
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              notification: {
                connect: {
                  id: newNotification?.id,
                },
              },
            },
          });
          return newComment;
        }
        return null;
      }
    ),
  },
};
