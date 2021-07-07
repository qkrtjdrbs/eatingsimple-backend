import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../user.utils";
import { uploadToS3 } from "../../shared/shared.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { email, password: newPassword, name, avatar, bio },
        { loggedInUser }
      ) => {
        try {
          if (email) {
            const emailIsNotValid = await client.user.findUnique({
              where: { email },
            });
            if (emailIsNotValid && emailIsNotValid.id !== loggedInUser.id) {
              throw new Error("This email already exist.");
            }
          }
          // hash password
          let uglyPassword = null;
          if (newPassword) {
            uglyPassword = await bcrypt.hash(newPassword, 10);
          }
          // Upload Avatar to s3
          let newAvatar = null;
          if (avatar) {
            newAvatar = await uploadToS3(avatar, loggedInUser.id, "avatars");
          }
          await client.user.update({
            where: {
              id: loggedInUser.id,
            },
            data: {
              email,
              name,
              ...(newAvatar && { avatar: newAvatar }),
              bio,
              ...(uglyPassword && { password: uglyPassword }),
            },
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
      }
    ),
  },
};
