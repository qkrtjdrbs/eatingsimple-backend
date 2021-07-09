import { gql } from "apollo-server-express";

export default gql`
  type Recipe {
    id: Int!
    title: String!
    content: String!
    photos: [Photo]
    user: User!
    userId: Int!
    comments: [Comment]
    commentsCount: Int!
    isMine: Boolean!
    likes: Int!
    createdAt: String!
    updatedAt: String
  }
`;
