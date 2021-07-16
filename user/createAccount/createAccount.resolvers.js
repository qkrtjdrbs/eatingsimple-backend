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
        const existUsername = await client.user.findUnique({
          where: { username },
        });
        if (existUsername) {
          throw new Error("이미 존재하는 아이디입니다");
        }
        const existEmail = await client.user.findUnique({
          where: { email },
        });
        if (existEmail) {
          throw new Error("이미 존재하는 이메일입니다");
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
          newAvatar = await uploadToS3(avatar[0], newUser.id, "avatars");
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
