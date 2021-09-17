import { withFilter } from "graphql-subscriptions";
import { NEW_NOTIFICATION } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    notificationUpdates: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(NEW_NOTIFICATION),
        ({ notificationUpdates }, { id }) => {
          return notificationUpdates.id === id;
        }
      ),
    },
  },
};
