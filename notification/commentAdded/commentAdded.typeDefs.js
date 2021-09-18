import { gql } from "apollo-server-express";

export default gql`
  type Subscription {
    commentAdded(id: Int!): Comment
  }
`;
