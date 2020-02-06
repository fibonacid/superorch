import {
  GET_CHANNEL_MESSAGES_QUERY,
  SEND_CHANNEL_MESSAGE_MUTATION
} from "../api/messages";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function useChannelMessages(orchestraId, channelId) {
  const variables = {
    orchestraId,
    channelId
  };

  const { data } = useQuery(GET_CHANNEL_MESSAGES_QUERY, { variables });

  const [sendChannelMessage] = useMutation(SEND_CHANNEL_MESSAGE_MUTATION, {
    refetchQueries: [
      {
        query: GET_CHANNEL_MESSAGES_QUERY,
        variables
      }
    ]
  });

  return [
     data ? data.channelMessages : [], 
     sendChannelMessage
   ];
}
