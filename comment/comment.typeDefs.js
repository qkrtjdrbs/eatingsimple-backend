import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    user: User
    userId: Int!
    recipe: Recipe!
    recipeId: Int!
    payload: String!
    isMine: Boolean!
    likes: Int!
    createdAt: String!
  }
`;
