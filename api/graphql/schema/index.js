const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type PageInfo {
    hasNextPage: Boolean!
  }

  input PaginationInput {
    first: Int!
    after: String
  }

  type Orchestra {
    _id: ID!
    name: String!
    owner: User!
    members: [Member!]!
    channels: [Channel!]
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
    SC_RAW
    SC_LANG
  }

  enum MessageContext {
    CHAT
    SUPERCOLLIDER
  }

  type Channel {
    _id: ID!
    name: String
    orchestra: Orchestra!
    members: [Member!]
  }

  interface Message {
    _id: ID!
    format: MessageFormat!
    context: MessageContext!
    body: String!
    from: Member!
  }

  type ChannelMessageConnection {
    pageInfo: PageInfo!
    edges: [ChannelMessageEdge!]!
  }

  type ChannelMessageEdge {
    cursor: String!
    node: ChannelMessage!
  }

  type ChannelMessage {
    _id: ID!
    format: MessageFormat!
    context: MessageContext!
    body: String!
    from: Member!
    to: Channel!
  }

  type PrivateMessageConnection {
    pageInfo: PageInfo!
    edges: [PrivateMessageEdge!]!
  }

  type PrivateMessageEdge {
    cursor: String!
    node: PrivateMessage!
  }

  type PrivateMessage {
    _id: ID!
    format: MessageFormat!
    context: MessageContext!
    body: String!
    from: Member!
    to: Member!
  }

  input MessageFilter {
    contexts: [MessageContext!]
    formats: [MessageFormat!]
  }

  input MessageInput {
    format: MessageFormat!
    context: MessageContext!
    body: String!
  }

  # This type specifies the entry points into our API.
  type Query {
    login(email: String!, password: String!): AuthData!
    user: User!
    orchestras: [Orchestra!]!
    orchestra(orchestraId: String!): Orchestra!
    members(orchestraId: String!): [Member!]
    member(orchestraId: String!, memberId: String!): Member!
    invites: [Invite!]
    channel(orchestraId: String!, channelId: String!): Channel!
    privateMessages(
      pagination: PaginationInput!
      orchestraId: String!
      memberId: String!
      filters: MessageFilter
    ): PrivateMessageConnection
    channelMessages(
      pagination: PaginationInput!
      orchestraId: String!
      channelId: String!
      filters: MessageFilter
    ): ChannelMessageConnection
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
    sendPrivateMessage(
      orchestraId: String!
      memberId: String!
      messageInput: MessageInput!
    ): PrivateMessage!
    sendChannelMessage(
      orchestraId: String!
      channelId: String!
      messageInput: MessageInput!
    ): ChannelMessage!
  }

  # The subscription root type, used to define all subscriptions.
  type Subscription {
    newInvite: Invite!
    newMember(orchestraId: String!): Member!
    newPrivateMessage(
      orchestraId: String!
      memberId: String!
      filters: MessageFilter
    ): PrivateMessage!
    newChannelMessage(
      orchestraId: String!
      channelId: String!
      filters: MessageFilter
    ): ChannelMessage!
  }
`;

module.exports = typeDefs;
