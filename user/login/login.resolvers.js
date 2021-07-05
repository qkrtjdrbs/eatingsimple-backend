import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({
        where: { username },
      });
      if (!user) {
        return {
          ok: false,
          error: "User not exist.",
        };
      }
      const isValidPw = await bcrypt.compare(password, user.password);
      if (!isValidPw) {
        return {
          ok: false,
          error: "Incorrect Password.",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
