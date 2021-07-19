import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  scalar DateTime
  type MutationResult {
    ok: Boolean!
    error: String
    id: Int
  }
`;
