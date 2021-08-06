import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editNestedComment(id: Int!, payload: String!): MutationResult!
  }
`;
