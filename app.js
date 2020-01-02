const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors')
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema");
const grapgQlResolvers = require("./graphql/resolvers");

const PORT = 3000;
const app = express();

const server = new ApolloServer({ 
  typeDefs: graphQlSchema, 
  resolvers: grapgQlResolvers,
  debug: true,
  playground: {
    endpoint: `http://localhost:5000/graphql`,
    subscriptionEndpoint: `ws://localhost:5000/graphql`
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('websocket client connected')
    },
    onDisconnect: (webSocket, context) => {
      console.log('websocket client disconnected')
    }
  }
});

server.applyMiddleware({ app, cors: true })

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

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

    // ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
      console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
    })
  })
  .catch(err => {
    console.error(err);
  });
