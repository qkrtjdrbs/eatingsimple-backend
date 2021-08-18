import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    disconnectTag: protectedResolver(async (_, { id, tag }) => {
      try {
        await client.recipe.update({
          where: { id },
          data: {
            tags: {
              disconnect: {
                tag,
              },
            },
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "태그를 삭제하지 못했습니다",
        };
      }
    }),
  },
};
