require("dotenv").config();
import http from "http";
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./user/user.utils";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  uploads: false,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    if (req) return { loggedInUser: await getUser(req.headers.token) };
  },
});

const app = express();
app.use(graphqlUploadExpress());
app.use(logger("tiny"));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}/graphql`);
});
