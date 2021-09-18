import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteNotification(id: Int!): MutationResult
  }
`;
