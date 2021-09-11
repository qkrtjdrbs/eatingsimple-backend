import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    confirmNotification: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const user = await client.notification.findUnique({ where: { id } });
        if (user?.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "로그인 정보와 일치하지 않습니다.",
          };
        }
        await client.notification.update({
          where: { id },
          data: { read: true },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
