import { gql } from "apollo-server-express";

export default gql`
  type Query {
    userCommentingRecipes(username: String!): [Recipe!]
  }
`;
