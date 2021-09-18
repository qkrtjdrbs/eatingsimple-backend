import { withFilter } from "graphql-subscriptions";
import { NEW_NOTIFICATION } from "../../constants";
import pubsub from "../../pubsub";

//내가 작성한 모든 레시피들의 id를 기준으로 listening

export default {
  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([NEW_NOTIFICATION]),
        ({ commentAdded }, { id }) => {
          return commentAdded.recipeId === id;
        }
      ),
    },
  },
};
