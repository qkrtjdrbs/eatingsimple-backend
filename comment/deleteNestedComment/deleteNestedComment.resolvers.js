import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deleteNestedComment: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const comment = await client.nestedComment.findUnique({
          where: { id },
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
        }
        await client.nestedCommentLike.deleteMany({
          where: { nestedCommentId: id },
        });
        await client.nestedComment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    ),
  },
};
