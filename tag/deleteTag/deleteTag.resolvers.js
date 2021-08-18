import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deleteTag: protectedResolver(async (_, { tag }) => {
      try {
        await client.tag.delete({ where: { tag } });
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
