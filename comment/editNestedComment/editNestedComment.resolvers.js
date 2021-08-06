import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    editNestedComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
        const comment = await client.nestedComment.findUnique({
          where: {
            id,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "댓글이 존재하지 않습니다",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "권한이 없습니다",
          };
        } else {
          await client.nestedComment.update({
            where: {
              id,
            },
            data: {
              payload,
            },
          });
          return {
            ok: true,
          };
        }
      }
    ),
  },
};
