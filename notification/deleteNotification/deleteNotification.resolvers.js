import client from "../../client";
import { protectedResolver } from "../../user/user.utils";

export default {
  Mutation: {
    deleteNotification: protectedResolver(
      async (_, { id }, { loggedInUser }) => {
        const not = await client.notification.findUnique({ where: { id } });
        if (!not) {
          return {
            ok: false,
            error: "해당 알림이 존재하지 않습니다",
          };
        }
        if (not.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "삭제 권한이 없습니다",
          };
        }
        await client.message.deleteMany({ where: { notificationId: id } });
        await client.notification.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    ),
  },
};
