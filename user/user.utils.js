import jwt from "jsonwebtoken";
import { client } from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
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
        error: "User's not logged in",
      };
    }
    return ourResolver(root, args, context, info);
  };
