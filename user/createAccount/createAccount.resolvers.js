import client from "../../client";
import bcrypt from "bcrypt";

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
        await client.user.create({
          data: {
            username,
            email,
            name,
            bio,
            password: uglyPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (e) {
        return {
          ok: false,
          error: "Can't create account.",
        };
      }
    },
  },
};
