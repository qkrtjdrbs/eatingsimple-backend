import { gql } from "apollo-server-express";

export default gql`
  type Query {
    searchRecipes(keyword: String!): [Recipe]!
  }
`;
