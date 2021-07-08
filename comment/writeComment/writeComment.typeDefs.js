import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    writeComment(recipeId: Int!, payload: String!): MutationResult!
  }
`;
