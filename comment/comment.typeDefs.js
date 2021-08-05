import { gql } from "apollo-server-express";

export default gql`
  type Comment {
    id: Int!
    user: User
    userId: Int!
    recipe: Recipe!
    recipeId: Int!
    nestedComments: [NestedComment]
    payload: String!
    isMine: Boolean!
    isLiked: Boolean!
    likes: Int!
    createdAt: DateTime!
  }
  type NestedComment {
    id: Int!
    user: User
    userId: Int!
    nestingId: Int!
    payload: String!
    isMine: Boolean!
    isLiked: Boolean!
    likes: Int!
    createdAt: DateTime!
  }
`;
