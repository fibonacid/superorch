import { gql } from 'apollo-boost';
import { MEMBER_DETAIL_FRAGMENT } from './members'

export const PRIVATE_MESSAGE_DETAIL_FRAGMENT = gql`
  fragment PrivateMessageDetail on PrivateMessage {
    _id
    __typename
    from {
      ...MemberDetail
    }
    body
    format
    context
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

export const CHANNEL_MESSAGE_DETAIL_FRAGMENT = gql`
  fragment ChannelMessageDetail on ChannelMessage {
    _id
    __typename
    from {
      ...MemberDetail
    }
    body
    format
    context
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

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
      ...ChannelMessageDetail
    }
  }
  ${CHANNEL_MESSAGE_DETAIL_FRAGMENT}
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
      ...PrivateMessageDetail
    }
  }
  ${PRIVATE_MESSAGE_DETAIL_FRAGMENT}
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
      ...ChannelMessageDetail
    }
  }
  ${CHANNEL_MESSAGE_DETAIL_FRAGMENT}
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
      ...PrivateMessageDetail
    }
  }
  ${PRIVATE_MESSAGE_DETAIL_FRAGMENT}
`;