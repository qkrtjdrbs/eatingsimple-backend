import { withFilter } from "graphql-subscriptions";
import { NEW_NOTIFICATION } from "../../constants";
import pubsub from "../../pubsub";

export default {
  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([NEW_NOTIFICATION]),
        ({ commentAdded }, { id }) => {
          return commentAdded.id === id;
        }
      ),
    },
  },
};
