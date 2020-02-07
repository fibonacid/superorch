import { GET_CHANNEL_QUERY } from "../../../../api/channels";
import { GET_MEMBER_QUERY } from "../../../../api/members";
import {
  SEND_PRIVATE_MESSAGE_MUTATION,
  SEND_CHANNEL_MESSAGE_MUTATION,
  GET_CHANNEL_MESSAGES_QUERY,
  NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
  GET_PRIVATE_MESSAGES_QUERY,
  NEW_PRIVATE_MESSAGE_SUBSCRIPTION
} from "../../../../api/messages";

export function getRequestMap(orchestraId, targetId, targetType) {
  let variables = {};
  switch (targetType) {
    case "channel":
      variables = {
        orchestraId,
        channelId: targetId
      };
      return {
        getTargetQuery: {
          document: GET_CHANNEL_QUERY,
          options: {
            variables
          }
        },
        getMessagesQuery: {
          document: GET_CHANNEL_MESSAGES_QUERY,
          options: {
            variables
          }
        },
        sendMessageMutation: {
          document: SEND_CHANNEL_MESSAGE_MUTATION,
          options: {
            variables,
            refetchQueries: [
              {
                query: GET_CHANNEL_MESSAGES_QUERY,
                variables
              }
            ]
          }
        },
        newMessageSubscription: {
          document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
          variables,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) return prev;
            const { newChannelMessage } = subscriptionData.data;
            return {
              channelMessages: [...prev.channelMessages, newChannelMessage]
            };
          }
        },
        getTitle: data => data?.channel?.name,
        getMessages: data => data?.channelMessages
      };
    case "member":
      variables = {
        orchestraId,
        memberId: targetId
      };
      return {
        getTargetQuery: {
          document: GET_MEMBER_QUERY,
          options: {
            variables
          }
        },
        getMessagesQuery: {
          document: GET_PRIVATE_MESSAGES_QUERY,
          options: {
            variables
          }
        },
        sendMessageMutation: {
          document: SEND_PRIVATE_MESSAGE_MUTATION,
          options: {
            variables,
            refetchQueries: [
              {
                query: GET_PRIVATE_MESSAGES_QUERY,
                variables
              }
            ]
          }
        },
        newMessageSubscription: {
          document: NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
          variables,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) return prev;
            const { newPrivateMessage } = subscriptionData.data;
            return {
              privateMessages: [...prev.privateMessages, newPrivateMessage]
            };
          }
        },
        getTitle: data => data?.member?.user?.name,
        getMessages: data => data?.privateMessages
      };
  }
}
