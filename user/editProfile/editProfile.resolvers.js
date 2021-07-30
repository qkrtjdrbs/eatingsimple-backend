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
              throw new Error("이미 존재하는 이메일 입니다");
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
            newAvatar = await uploadToS3(avatar[0], loggedInUser.id, "avatars");
          }
          const user = await client.user.update({
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
          return user;
        } catch (e) {
          return null;
        }
      }
    ),
  },
};
