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
    name: String
    email: String
    password: String
    firstName: String
    lastName: String
    city: String
    birthdate: String
    createdOrchestras: [Orchestra!]
    memberOf: [Orchestra!]
    sentInvites: [Invite!]
    receivedInvites: [Invite!]
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  input UserInput {
    firstName: String
    lastName: String
    city: String
    birthdate: String
    bio: String
  }

  input OrchestraInput {
    name: String
  }

  # This type specifies the entry points into our API.
  type Query {
    user: User!
    orchestras: [Orchestra!]!
    orchestraById(orchestraId: String!): Orchestra!
    invites: [Invite!]!
    members(orchestraId: ID!): [Member!]!
    login(email: String!, password: String!): AuthData!
  }

  # The mutation root type, used to define all mutations.
  type Mutation {
    register(name: String!, email: String!, password: String!): AuthData!
    updateUser(userInput: UserInput!): User
    createOrchestra(name: String!): Orchestra!
    updateOrchestra(
      orchestraId: String!
      orchestraInput: OrchestraInput!
    ): Orchestra!
    sendInvite(orchestraId: String!, email: String!): Invite!
    acceptInvite(inviteId: String!): Member!
  }

  # The subscription root type, used to define all subscriptions.
  type Subscription {
    newInvite: Invite!
    newMember(orchestraId: String!): Member!
  }
`;

module.exports = typeDefs;
