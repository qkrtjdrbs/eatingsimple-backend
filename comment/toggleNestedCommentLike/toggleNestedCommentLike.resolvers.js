import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    toggleNestedCommentLike: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const comment = await client.nestedComment.findUnique({
          where: { id },
        });
        if (!comment) {
          return {
            ok: false,
            error: "댓글이 존재하지 않습니다",
          };
        }
        const like = await client.nestedCommentLike.findUnique({
          where: {
            nestedCommentId_userId: {
              nestedCommentId: id,
              userId: loggedInUser.id,
            },
          },
        });
        if (like) {
          await client.nestedCommentLike.delete({ where: { id: like.id } });
        } else {
          await client.nestedCommentLike.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              nestedComment: {
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
