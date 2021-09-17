import client from "../client";

export default {
  Notification: {
    message: ({ id }) =>
      client.message.findMany({ where: { notificationId: id } }),
  },
};
