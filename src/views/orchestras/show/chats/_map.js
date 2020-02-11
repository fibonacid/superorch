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

const filters = {
  contexts: ["CHAT", "SUPERCOLLIDER"],
  formats: ["PLAIN_TEXT", "JSON", "SC_RAW", "SC_LANG"]
};

export function getRequestMap(
  orchestraId,
  targetId,
  targetType,
  onNewMessage = () => {}
) {
  switch (targetType) {
    case "channel":
      return {
        getTargetQuery: {
          document: GET_CHANNEL_QUERY,
          options: {
            variables: {
              orchestraId,
              channelId: targetId
            }
          }
        },
        getMessagesQuery: {
          document: GET_CHANNEL_MESSAGES_QUERY,
          options: {
            variables: {
              orchestraId,
              channelId: targetId,
              filters
            }
          }
        },
        sendMessageMutation: {
          document: SEND_CHANNEL_MESSAGE_MUTATION,
          options: {
            variables: {
              orchestraId,
              channelId: targetId
            },
            refetchQueries: [
              {
                query: GET_CHANNEL_MESSAGES_QUERY,
                variables: {
                  orchestraId,
                  channelId: targetId,
                  filters
                }
              }
            ]
          }
        },
        newMessageSubscription: {
          document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
          variables: {
            orchestraId,
            channelId: targetId,
            filters
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) return prev;
            const { newChannelMessage } = subscriptionData.data;
            onNewMessage(newChannelMessage);

            return {
              channelMessages: [...prev.channelMessages, newChannelMessage]
            };
          }
        },
        getTitle: data => data?.channel?.name && `# ${data.channel.name}`,
        getMessages: data => data?.channelMessages
      };
    case "member":
      return {
        getTargetQuery: {
          document: GET_MEMBER_QUERY,
          options: {
            variables: {
              orchestraId,
              memberId: targetId,
              filters
            }
          }
        },
        getMessagesQuery: {
          document: GET_PRIVATE_MESSAGES_QUERY,
          options: {
            variables: {
              orchestraId,
              memberId: targetId,
              filters
            }
          }
        },
        sendMessageMutation: {
          document: SEND_PRIVATE_MESSAGE_MUTATION,
          options: {
            variables: {
              orchestraId,
              memberId: targetId
            },
            refetchQueries: [
              {
                query: GET_PRIVATE_MESSAGES_QUERY,
                variables: {
                  orchestraId,
                  memberId: targetId,
                  filters
                }
              }
            ]
          }
        },
        newMessageSubscription: {
          document: NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
          variables: {
            orchestraId,
            memberId: targetId,
            filters
          },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) return prev;
            const { newPrivateMessage } = subscriptionData.data;
            onNewMessage(newPrivateMessage);

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
