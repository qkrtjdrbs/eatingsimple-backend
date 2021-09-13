import { NEW_NOTIFICATION } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    notificationUpdates: {
      subscribe: () => pubsub.asyncIterator(NEW_NOTIFICATION),
    },
  },
};
