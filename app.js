const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const cors = require("./middleware/cors");
const isAuth = require("./middleware/is-auth");
const graphQlSchema = require("./graphql/schema");
const grapgQlResolvers = require("./graphql/resolvers");

const app = express();
const graphqlPath = '/graphql';

const PORT = 3000;

const apollo = new ApolloServer({ 
  typeDefs: graphQlSchema, 
  resolvers: grapgQlResolvers,
  playground: {
    endpointURL: graphqlPath,
    subscriptionsEndpoint: `ws://localhost:${PORT}${graphqlPath}`
  }
});
apollo.applyMiddleware({ app, path: graphqlPath });

app.use(cors);
app.use('/graphql', isAuth);

const httpServer = createServer(app)

apollo.installSubscriptionHandlers(httpServer);

//
// Connect to Database
//
const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

mongoose
  .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database");

    httpServer.listen({ port: PORT }, () => {
        new SubscriptionServer({
          execute,
          subscribe,
          schema: graphQlSchema,
        }, {
          server: httpServer,
          path: graphqlPath,
        });
        console.log(`🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`);
        console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apollo.subscriptionsPath}`)
      }
    )
  })
  .catch(err => {
    console.error(err);
  });
