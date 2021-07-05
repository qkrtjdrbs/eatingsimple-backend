import { gql } from "apollo-server-express";

export default gql`
  scalar Upload
  type MutationResult {
    ok: Boolean!
    error: String
  }
`;
