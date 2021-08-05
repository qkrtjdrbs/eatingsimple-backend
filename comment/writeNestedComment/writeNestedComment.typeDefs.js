import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    writeNestedComment(nestingId: Int!, payload: String!): NestedComment
  }
`;
