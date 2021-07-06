import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    userId: Int!
    file: String!
    recipe: Recipe!
    recipeId: Int!
    createdAt: String
    updatedAt: String
  }
`;
