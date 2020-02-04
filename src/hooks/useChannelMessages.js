import {
  channelMessagesDocument,
  sendChannelMessageDocument
} from "../config/documents";
import { useQuery, useMutation } from "@apollo/react-hooks";

export default function useChannelMessages(orchestraId, channelId) {
  const variables = {
    orchestraId,
    channelId
  };

  const { data } = useQuery(channelMessagesDocument, { variables });

  const [sendChannelMessage] = useMutation(sendChannelMessageDocument, {
    refetchQueries: [
      {
        query: channelMessagesDocument,
        variables
      }
    ]
  });

  return [
     data ? data.channelMessages : [], 
     sendChannelMessage
   ];
}
