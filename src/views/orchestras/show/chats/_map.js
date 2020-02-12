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

const maxMessages = 50;

export function getRequestMap(
  orchestraId,
  targetId,
  targetType,
  onNewMessage = () => {}
) {
  // eslint-disable-next-line default-case
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
              pagination: {
                first: maxMessages
              },
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
                  pagination: {
                    first: maxMessages
                  },
                  orchestraId,
                  channelId: targetId,
                  filters
                }
              }
            ]
          }
        },
        moreMessagesQuery: cursor =>({
          query: GET_CHANNEL_MESSAGES_QUERY,
          variables: {
            pagination: {
              first: maxMessages,
              after: cursor
            },
            orchestraId,
            channelId: targetId,
            filters
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if(!fetchMoreResult) return prev;
            const { channelMessages } = fetchMoreResult;
            console.log(channelMessages)

            return {
              channelMessages: {
                edges: [
                  ...prev.channelMessages.edges,
                  ...channelMessages.edges
                ],
                pageInfo: channelMessages.pageInfo,
                __typename: "ChannelMessageConnection"
              }
            }
          }
        }),
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
              channelMessages: {
                edges: [
                  {
                    node: newChannelMessage,
                    cursor: newChannelMessage._id,
                    __typename: "ChannelMessageEdge"
                  },
                  ...prev.channelMessages.edges,
                ],
                pageInfo: prev.channelMessages.pageInfo,
                __typename: "ChannelMessageConnection"
              }
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
              pagination: {
                first: maxMessages
              },
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
                  pagination: {
                    first: maxMessages
                  },
                  orchestraId,
                  memberId: targetId,
                  filters
                }
              }
            ]
          }
        },
        moreMessagesQuery: cursor => ({
          query: GET_PRIVATE_MESSAGES_QUERY,
          variables: {
            pagination: {
              first: maxMessages,
              after: cursor
            },
            orchestraId,
            memberId: targetId,
            filters
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if(!fetchMoreResult) return prev;
            const { privateMessages } = fetchMoreResult;

            return {
              privateMessages: {
                edges: [
                  ...prev.privateMessages.edges,
                  ...privateMessages.edges
                ],
                pageInfo: privateMessages.pageInfo,
                __typename: "PrivateMessageConnection"
              }
            }
          }
        }),
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
              channelMessages: {
                edges: [
                  {
                    node: newPrivateMessage,
                    cursor: newPrivateMessage._id,
                    __typename: "PrivateMessageEdge"
                  },
                  ...prev.privateMessages.edges,
                ],
                pageInfo: prev.privateMessages.pageInfo,
                __typename: "PrivateMessageConnection"
              }
            };
          }
        },
        getTitle: data => data?.member?.user?.name,
        getMessages: data => data?.privateMessages
      };
  }
}
