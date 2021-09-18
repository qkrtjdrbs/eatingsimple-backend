import client from "../../client";
import { NEW_NOTIFICATION } from "../../constants";
import pubsub from "../../pubsub";
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
          pubsub.publish(NEW_NOTIFICATION, {
            commentAdded: { ...newNotification },
          });
          return newComment;
        }
        return null;
      }
    ),
  },
};
