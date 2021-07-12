import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { files }, { loggedInUser }) => {
      try {
        files.forEach(async (file) => {
          const photo = await client.photo.findUnique({ where: { file } });
          if (!photo) {
            throw new Error("Photo not exist");
          }
          if (photo.userId !== loggedInUser.id) {
            throw new Error("Not your photo");
          }
          await client.photo.delete({ where: { file } });
        });
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
