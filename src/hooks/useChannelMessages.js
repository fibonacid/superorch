import { useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_CHANNEL_MESSAGES_QUERY,
  SEND_CHANNEL_MESSAGE_MUTATION,
  NEW_CHANNEL_MESSAGE_SUBSCRIPTION
} from "../api/messages";

export default function useChannelMessages(
  orchestraId,
  channelId,
  contexts = ["CHAT", "SUPERCOLLIDER"],
  formats = ["PLAIN_TEXT", "JSON", "SC_RAW", "SC_LANG"]
) {
  const variables = {
    orchestraId,
    channelId,
    filters: {
      contexts,
      formats
    }
  };

  const { subscribeToMore, data } = useQuery(GET_CHANNEL_MESSAGES_QUERY, {
    variables
  });

  const subscribe = useCallback(() =>
    subscribeToMore({
      document: NEW_CHANNEL_MESSAGE_SUBSCRIPTION,
      variables,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { newChannelMessage } = subscriptionData.data;
        return {
          channelMessages: [...prev.channelMessages, newChannelMessage]
        };
      }
    })
  );

  useEffect(subscribe, []);

  const [sendChannelMessage] = useMutation(SEND_CHANNEL_MESSAGE_MUTATION, {
    refetchQueries: [
      {
        query: GET_CHANNEL_MESSAGES_QUERY,
        variables
      }
    ]
  });

  return [data ? data.channelMessages : [], sendChannelMessage];
}