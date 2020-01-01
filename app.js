const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const { createServer } = require('http');
//const { execute, subscribe } = require('graphql');
const graphqlHttp = require("express-graphql");
const isAuth = require("./middleware/is-auth");

const graphQlSchema = require("./graphql/schema");
const graphQlResolvers = require("./graphql/resolvers");

const app = express();

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;

mongoose
  .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to database");

    app.listen(3000);
    console.log("Listening on port 3000");
  })
  .catch(err => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World");
});
