import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createRecipe(
      title: String!
      content: String!
      files: [Upload]
    ): MutationResult!
  }
`;
