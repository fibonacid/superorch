import React, { useCallback } from "react";
import {
  channelMessagesDocument,
  sendChannelMessageDocument
} from "../../../config/documents";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useChannel from "../../../hooks/useChannel";
import MessageBoard from "../../../components/MessageBoard";

export default function ChannelChatView({ channelId }) {
  const params = useParams();
  const orchestraId = params.orchestra;

  const channel = useChannel(orchestraId, channelId);

  const queryOptions = {
    variables: {
      orchestraId,
      channelId
    }
  };

  const { data, loading, error } = useQuery(
    channelMessagesDocument,
    queryOptions
  );

  const [sendChannelMessage] = useMutation(sendChannelMessageDocument, {
    refetchQueries: [
      {
        query: channelMessagesDocument,
        ...queryOptions
      }
    ]
  });

  const onSend = useCallback(text => {
    sendChannelMessage({
      variables: {
        orchestraId,
        channelId,
        format: "PLAIN_TEXT",
        context: "CHAT",
        body: text
      }
    });
  }, []);

  return (
    <>
      {data && (
        <MessageBoard
          title={(channel && channel.name) || ""}
          messages={data.channelMessages}
          onSend={onSend}
        />
      )}
      {error && <span>{error.message}</span>}
      {loading && <span>loading ...</span>}
    </>
  );
}
