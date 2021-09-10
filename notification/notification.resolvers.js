import client from "../client";

export default {
  Notification: {
    message: ({ id }) => client.notification.findMany({ where: { id } }),
  },
};
