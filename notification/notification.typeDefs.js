import { gql } from "apollo-server-express";

export default gql`
  type Message {
    id: Int!
    kind: String!
    user: User!
    userId: Int!
    notification: Notification!
    notificationId: Int!
    createdAt: String
  }
  type Notification {
    id: Int!
    user: User!
    userId: Int
    message: [Message]
    read: Boolean!
  }
`;
