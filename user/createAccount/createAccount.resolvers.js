import client from "../../client";
import bcrypt from "bcrypt";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, name, avatar, bio }
    ) => {
      try {
        const isNotValid = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });
        if (isNotValid) {
          throw new Error("This username or email already exist.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        const newUser = await client.user.create({
          data: {
            username,
            email,
            name,
            bio,
            password: uglyPassword,
          },
        });
        let newAvatar = null;
        if (avatar) {
          newAvatar = await uploadToS3(avatar, newUser.id, "avatar");
          await client.user.update({
            where: { id: newUser.id },
            data: { avatar: newAvatar },
          });
        }
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
