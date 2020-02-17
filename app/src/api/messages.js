import { gql } from "apollo-boost";
import { MEMBER_DETAIL_FRAGMENT } from "./members";

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
  query getChannelMessages($pagination: PaginationInput!, $orchestraId: String!, $channelId: String!) {
    channelMessages(
      pagination: $pagination
      orchestraId: $orchestraId
      channelId: $channelId
      filters: {
        contexts: [CHAT, SUPERCOLLIDER]
        formats: [PLAIN_TEXT, JSON, SC_RAW, SC_LANG]
      }
    ) {
      edges {
        cursor
        node {
          ...ChannelMessageDetail
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
  ${CHANNEL_MESSAGE_DETAIL_FRAGMENT}
`;

export const GET_PRIVATE_MESSAGES_QUERY = gql`
  query getPrivateMessages($pagination: PaginationInput!, $orchestraId: String!, $memberId: String!) {
    privateMessages(
      pagination: $pagination
      orchestraId: $orchestraId
      memberId: $memberId
      filters: {
        contexts: [CHAT, SUPERCOLLIDER]
        formats: [PLAIN_TEXT, JSON, SC_RAW, SC_LANG]
      }
    ) {
      edges {
        cursor
        node {
          ...PrivateMessageDetail
        }
      }
      pageInfo {
        hasNextPage
      }
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

export const NEW_PRIVATE_MESSAGE_SUBSCRIPTION = gql`
  subscription newPrivateMessage(
    $orchestraId: String!
    $memberId: String!
    $formats: [MessageFormat!]
    $contexts: [MessageContext!]
  ) {
    newPrivateMessage(
      orchestraId: $orchestraId
      memberId: $memberId
      filters: { formats: $formats, contexts: $contexts }
    ) {
      ...PrivateMessageDetail
    }
  }
  ${PRIVATE_MESSAGE_DETAIL_FRAGMENT}
`;

export const NEW_CHANNEL_MESSAGE_SUBSCRIPTION = gql`
  subscription newChannelMessage(
    $orchestraId: String!
    $channelId: String!
    $formats: [MessageFormat!]
    $contexts: [MessageContext!]
  ) {
    newChannelMessage(
      orchestraId: $orchestraId
      channelId: $channelId
      filters: { formats: $formats, contexts: $contexts }
    ) {
      ...ChannelMessageDetail
    }
  }
  ${CHANNEL_MESSAGE_DETAIL_FRAGMENT}
`;
