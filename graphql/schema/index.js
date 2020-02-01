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
    createdOrchestras: [Orchestra!]
    memberOf: [Orchestra!]
    sentInvites: [Invite!]
    receivedInvites: [Invite!]
    firstName: String
    lastName: String
    city: String
    birthdate: String
    bio: String
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

  enum MessageFormat {
    PLAIN_TEXT
    JSON
    SC_OSC
    SC_SCLANG
  }

  enum MessageContext {
    CHAT
    SUPERCOLLIDER
  }

  type Channel {
    _id: ID!
    name: String #public
    orchestra: Orchestra!
    members: [Member!]
  }

  interface Message {
    from: Member!
    format: MessageFormat!
    context: MessageContext!
    to: Member || Channel
  }

  input MessageInput {
    from: String!
    format: MessageFormat!
    context: MessageContext!
    to: String!
  }

  type ChannelMessage implements Message {
    _id: ID!
    from: Member!
    format: MessageFormat!
    context: MessageContext!
    to: Channel
  }

  type PrivateMessage implements Message {
    _id: ID!
    from: Member!
    format: MessageFormat!
    context: MessageContext!
    to: Member
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
    deleteOrchestra(orchestraId: String!): Orchestra
    sendInvite(orchestraId: String!, email: String!): Invite!
    acceptInvite(inviteId: String!): Member!
    denyInvite(inviteId: String!): Invite!
    sendMessageToMember(messageInput: MessageInput!)
    sendMessageToChannel(messageInput: MessageInput!)
  }

  # The subscription root type, used to define all subscriptions.
  type Subscription {
    newInvite: Invite!
    newMember(orchestraId: String!): Member!
    newMessageFromMember(orchestraId: String!, memberId: String!, context: MessageContext): PrivateMessage
    newMessageFromChannel(orchestraId: String!, channelId: String!, context: MessageContext): ChannelMessage
  }
`;

module.exports = typeDefs;
