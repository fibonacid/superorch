const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const isAuth = require('./middleware/is-auth');
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema");
const grapgQlResolvers = require("./graphql/resolvers");
const { validateToken } = require('./helpers/auth');

const PORT = 3000;
const app = express();

const server = new ApolloServer({ 
  typeDefs: graphQlSchema, 
  resolvers: grapgQlResolvers,
  context: ({req}) => ({
    userId: req.userId,
    isAuth: req.isAuth
  }),
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith("Database Error: ")) {
      return new Error('Internal server error');
    }
    if (err.message.startsWith("Unauthenticated")) {
      return new Error('Authentication error');
    }
    console.log(err)
    // Otherwise return the original error.  The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  },
  subscriptions: {
    onConnect: (connectionParams, webSocket, context) => {
      console.log('websocket client connected');

      // Check authToken
      if (connectionParams.authToken) {
        const decodedToken = validateToken(connectionParams.authToken);
        console.log(decodedToken);

        if (!decodedToken) {
          context.isAuth = false;
          throw new Error('Invalid auth token');
        }

        context.isAuth = true;
        context.userId = decodedToken.userId;
        return;
      }

      context.isAuth = false;
      throw new Error('Missing auth token');
    },
    onDisconnect: (webSocket, context) => {
      console.log('websocket client disconnected')
    }
  },
  playground: {
    endpoint: `http://localhost:5000/graphql`,
    subscriptionEndpoint: `ws://localhost:5000/graphql`
  }
});

app.use('*', isAuth);

server.applyMiddleware({ app, cors: true })

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);


// Setup mongoose

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

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
