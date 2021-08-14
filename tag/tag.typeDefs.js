import { gql } from "apollo-server-express";

export default gql`
  type Tag {
    id: Int!
    tag: String!
    recipes: [Recipe]
    createdAt: String
  }
`;
