import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    writeNestedComment: protectedResolver(
      async (_, { nestingId, payload }, { loggedInUser }) => {
        const existing = await client.comment.findUnique({
          where: { id: nestingId },
        });
        if (!existing) {
          return null;
        }
        const newComment = await client.nestedComment.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            nestingComment: {
              connect: {
                id: nestingId,
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
