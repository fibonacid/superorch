import { gql } from 'apollo-boost';

export const GET_CHANNEL_MESSAGES_QUERY = gql`
  query getChannelMessages($orchestraId: String!, $channelId: String!) {
    channelMessages(
      orchestraId: $orchestraId
      channelId: $channelId
      filters: {
        contexts: [CHAT, SUPERCOLLIDER]
        formats: [PLAIN_TEXT, JSON, SC_RAW, SC_LANG]
      }
    ) {
      _id
      from {
        user {
          _id
        }
      }
      body
      format
      context
    }
  }
`;

export const GET_PRIVATE_MESSAGES_QUERY = gql`
  query getPrivateMessages($orchestraId: String!, $memberId: String!) {
    privateMessages(
      orchestraId: $orchestraId
      memberId: $memberId
      filters: {
        contexts: [CHAT, SUPERCOLLIDER]
        formats: [PLAIN_TEXT, JSON, SC_RAW, SC_LANG]
      }
    ) {
      _id
      from {
        _id
        user {
          _id
          name
        }
      }
      body
      format
      context
    }
  }
`;


export const SEND_CHANNEL_MESSAGE_MUTATION = gql`
  mutation sendChannelMessage(
    $orchestraId: String!
    $channelId: String!
    $format: MessageFormat!
    $context: MessageContext!
    $body: String!
  ) {
    sendChannelMessage(
      orchestraId: $orchestraId
      channelId: $channelId
      messageInput: { format: $format, context: $context, body: $body }
    ) {
      _id
    }
  }
`;

export const SEND_PRIVATE_MESSAGE_MUTATION = gql`
  mutation sendPrivateMessage(
    $orchestraId: String!
    $memberId: String!
    $format: MessageFormat!
    $context: MessageContext!
    $body: String!
  ) {
    sendPrivateMessage(
      orchestraId: $orchestraId
      memberId: $memberId
      messageInput: { format: $format, context: $context, body: $body }
    ) {
      _id
    }
  }
`;