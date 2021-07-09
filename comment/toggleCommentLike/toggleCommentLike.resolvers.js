import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    toggleCommentLike: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const comment = await client.comment.findUnique({ where: { id } });
        if (!comment) {
          return {
            ok: false,
            error: "Comment not exist",
          };
        }
        const like = await client.commentLike.findUnique({
          where: {
            commentId_userId: {
              commentId: id,
              userId: loggedInUser.id,
            },
          },
        });
        if (like) {
          await client.commentLike.delete({ where: { id: like.id } });
        } else {
          await client.commentLike.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              comment: {
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
      }
    ),
  },
};
