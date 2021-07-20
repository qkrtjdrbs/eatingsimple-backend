import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeRecipe(id: Int!): Recipe
  }
`;
