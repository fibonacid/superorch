const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type Event {
     _id: ID!
     title: String!
     description: String!
     price: Float!
     date: String!
     creator: User!
   }

  type User {
    _id: ID!
    email: String!
    password: String
     createdEvents: [Event!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
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

  # This type specifies the entry points into our API. 
  type Query {
     events: [Event!]!
     login(email: String! password: String!): AuthData!
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
     createEvent(eventInput: EventInput): Event
     createUser(userInput: UserInput): User
  }

  # The subscription root type, used to define all subscriptions.
  type Subscription {
    userJoined: User!
  }
`;

module.exports = typeDefs;
