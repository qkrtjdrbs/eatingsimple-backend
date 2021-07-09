import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editRecipe(
      id: Int!
      title: String
      content: String
      files: [Upload]
    ): MutationResult!
  }
`;
