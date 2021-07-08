import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({ where: { id } });
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
      await client.commentLike.deleteMany({ where: { commentId: id } });
      await client.comment.delete({ where: { id } });
      return {
        ok: true,
      };
    }),
  },
};
