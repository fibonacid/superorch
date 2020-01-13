const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Orchestra {
    _id: ID!
    name: String!
    owner: User!
    members: [Member!]!
  }

  type Member {
    _id: ID!
    orchestra: Orchestra!
    user: User!
  }

  type Invite {
    _id: ID!
    email: String!
    subject: Orchestra!
    from: User!
    to: User
    createdAt: String!
    pending: Boolean!
  }

  type User {
    _id: ID!
    email: String
    password: String
    nickname: String
    createdOrchestras: [Orchestra!]
    sentInvites: [Invite!]
    receivedInvites: [Invite!]
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
    singleOrchestra(orchestraId: ID!): Orchestra!
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
    acceptInvite(inviteId: String!): Member!
  }

  # The subscription root type, used to define all subscriptions.
  type Subscription {
    userJoined: User!
    newInvite: Invite!
  }
`;

module.exports = typeDefs;
