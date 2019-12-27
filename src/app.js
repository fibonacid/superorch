const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const app = express();

const events = [];

app.use(bodyParser.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }
    
    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }
  
    type RootQuery {
      events: [Event!]!
    }
    
    type RootMutation {
      createEvent(eventInput: EventInput): Event
    }
  
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return events
    },
    createEvent: (args) => {
      const event = {
        _id: Math.random().toString(),
        ...args.eventInput
      };
      events.push(events);
      return event;
    }
  },
  graphiql: true
}));

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB
} = process.env;

mongoose.connect(
  `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
).then(() => {
  console.log('Connected to database');

  app.listen(3000);
  console.log('Listening on port 3000');
}).catch(err => {
  console.error(err);
});

app.get('/', (req, res) => {
  res.send('Hello World');
});



