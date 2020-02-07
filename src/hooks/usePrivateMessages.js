import { useQuery, useMutation } from "@apollo/react-hooks";
import { useEffect, useCallback } from "react";
import {
  GET_PRIVATE_MESSAGES_QUERY,
  SEND_PRIVATE_MESSAGE_MUTATION,
  NEW_PRIVATE_MESSAGE_SUBSCRIPTION
} from "../api/messages";

export default function usePrivateMessages(
  orchestraId,
  memberId,
  contexts = ["CHAT", "SUPERCOLLIDER"],
  formats = ["PLAIN_TEXT", "JSON", "SC_RAW", "SC_LANG"]
) {
  const variables = {
    orchestraId,
    memberId,
    filters: {
      contexts,
      formats
    }
  };

  const { subscribeToMore, data } = useQuery(GET_PRIVATE_MESSAGES_QUERY, {
    variables
  });

  const subscribe = useCallback(() =>
    subscribeToMore({
      document: NEW_PRIVATE_MESSAGE_SUBSCRIPTION,
      variables,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { newPrivateMessage } = subscriptionData.data;
        return {
          privateMessages: [...prev.privateMessages, newPrivateMessage]
        };
      }
    })
  );

  useEffect(subscribe, []);

  const [sendPrivateMessage] = useMutation(SEND_PRIVATE_MESSAGE_MUTATION, {
    refetchQueries: [
      {
        query: GET_PRIVATE_MESSAGES_QUERY,
        variables
      }
    ]
  });

  return [data ? data.privateMessages : [], sendPrivateMessage];
}
