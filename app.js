const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require('apollo-server-express');
const cors = require("./middleware/cors");
const isAuth = require("./middleware/is-auth");

const graphQlSchema = require("./graphql/schema");
const grapgQlResolvers = require("./graphql/resolvers");

const app = express();
const path = '/graphql';

const server = new ApolloServer({ 
  typeDefs: graphQlSchema, 
  resolvers: grapgQlResolvers 
});
server.applyMiddleware({ app, path });

app.use(cors);
app.use('/graphql', isAuth);

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

    app.listen({ port: 3000 }, () =>
      console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
    )
  })
  .catch(err => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});
