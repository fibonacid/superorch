const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Orchestra {
    _id: ID!
    name: String!
    owner: User!
  }

  type Member {
    _id: ID!
    owner: Orchestra!
    user: User!
  }

  type Invite {
    _id: ID!
    orchestraId: ID!
    userId: ID!
    sentAt: String
  }

  type User {
    _id: ID!
    email: String
    password: String
    nickname: String
    createdOrchestras: [Orchestra!]
    pendingInvites: [Invite!]
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
    invites: [Invite!]!
    members(orchestraId: ID!): [Member!]!
    login(email: String!, password: String!): AuthData!
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    createUser(email: String!, password: String!): AuthData!
    updateUser(userInput: UserInput!): User
    createOrchestra(name: String!): Orchestra!
    sendInvite(orchestraId: String!, email: String!): Invite!
    acceptInvite(inviteId: String!): Orchestra!
  }

  # The subscription root type, used to define all subscriptions.
  type Subscription {
    userJoined: User!
    newInvite: Invite!
  }
`;

module.exports = typeDefs;
