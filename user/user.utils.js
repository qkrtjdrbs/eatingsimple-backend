import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findFirst({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
};

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    const { loggedInUser } = context;
    if (!loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      }
      return {
        ok: false,
        error: "로그인 상태가 아닙니다",
      };
    }
    return ourResolver(root, args, context, info);
  };
