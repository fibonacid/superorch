const { makeExecutableSchema } = requier("graphql-tools");
const resolvers = require("../resolvers");

const typeDefs = `
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

  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
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
    bookings: [Booking!]!
    login(email: String! password: String!): AuthData!
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
  }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
