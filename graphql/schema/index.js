const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Orchestra {
    _id: ID!
    name: String!
    owner: User!
  }

  type User {
    _id: ID!
    email: String
    password: String
    nickname: String
    createdOrchestras: [Orchestra!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    email: String
    password: String
    nickname: String
  }

  # This type specifies the entry points into our API.
  type Query {
    users: [User!]!
    orchestras: [Orchestra!]!
    login(email: String!, password: String!): AuthData!
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    createUser(email: String!, password: String!): AuthData!
    createOrchestra(name: String!): Orchestra!
    updateUser(userInput: UserInput!): User
  }

  # The subscription root type, used to define all subscriptions.
  type Subscription {
    userJoined: User!
  }
`;

module.exports = typeDefs;
