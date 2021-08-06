import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({ where: { id } });
      const nestedComments = await client.comment
        .findUnique({ where: { id } })
        .nestedComment();
      if (!comment) {
        return {
          ok: false,
          error: "Comment not exist",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized.",
        };
      }
      if (nestedComments.length) {
        await client.comment.update({
          where: { id },
          data: {
            payload: "[삭제된 댓글입니다]",
          },
        });
        return {
          ok: true,
        };
      }
      await client.commentLike.deleteMany({ where: { commentId: id } });
      await client.comment.delete({ where: { id } });
      return {
        ok: true,
      };
    }),
  },
};
