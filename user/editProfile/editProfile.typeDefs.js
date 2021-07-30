import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editProfile(
      email: String
      password: String
      name: String
      avatar: [Upload]
      bio: String
    ): User
  }
`;
