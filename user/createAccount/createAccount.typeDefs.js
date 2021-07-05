import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    createAccount(
      username: String!
      email: String!
      password: String!
      name: String!
      avatar: Upload
      bio: String
    ): MutationResult!
  }
`;
