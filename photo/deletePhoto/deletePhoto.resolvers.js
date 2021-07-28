import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { file }, { loggedInUser }) => {
      try {
        const photo = await client.photo.findUnique({ where: { file } });
        if (!photo) {
          throw new Error("사진이 존재하지 않습니다");
        }
        if (photo.userId !== loggedInUser.id) {
          throw new Error("사진의 소유자가 아닙니다");
        }
        await client.photo.delete({ where: { file } });

        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    }),
  },
};
