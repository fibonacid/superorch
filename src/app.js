const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Event = require('./models/events');
const User = require('./models/users');

const app = express();

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
    
    type User {
      _id: ID!
      email: String!
      password: String
    }
     
    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }
    
    input UserInput {
      email: String!
      password: String!
    }
  
    type RootQuery {
      events: [Event!]!
    }
    
    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }
  
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find().then(events => {
        return events.map(event => {
          return { ...event._doc }
        })
      }).catch(err => {
        console.log(err);
        return err;
      });
    },
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date)
      });
      return event.save().then(result => {
        console.log(result);
        return {...result._doc }
      }).catch(err => {
        console.log(err);
        return err;
      });
    },
    createUser: (args) => {
      return User.findOne({email: args.userInput.email})
        .then(user => {
          if (user) {
            throw new Error('User exists already')
          }
          return bcrypt.hash(args.userInput.password, 12)
        })
        .then(hashedPassword => {
          const user = new User({
            email: args.userInput.email,
            password: hashedPassword
          });
          return user.save();
        })
        .then(result => {
          console.log(result);
          return {...result._doc, password: null }
        })
        .catch(err => {
          console.log(err);
          return err;
        });
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



