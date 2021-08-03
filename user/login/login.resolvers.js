import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      try {
        const user = await client.user.findUnique({
          where: { username },
        });
        if (!user) {
          return {
            ok: false,
            error: "존재하지 않는 유저입니다",
          };
        }
        const isValidPw = await bcrypt.compare(password, user.password);
        if (!isValidPw) {
          return {
            ok: false,
            error: "잘못된 패스워드입니다",
          };
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
        return {
          ok: true,
          token,
        };
      } catch (e) {
        return {
          ok: false,
          error: "로그인에 실패했습니다",
        };
      }
    },
  },
};
