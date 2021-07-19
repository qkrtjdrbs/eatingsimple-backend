import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    name: String!
    username: String!
    email: String!
    password: String!
    bio: String
    avatar: String
    isMe: Boolean!
    createdAt: DateTime!
  }
`;
