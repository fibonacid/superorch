import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useChannelMessages from "../../../../hooks/useChannelMessages";
import MessageBoard from "../../../../components/MessageBoard";

export default function OrchestraChannelShowView() {
  const { 
    orchestra: orchestraId,
    channel: channelId 
  } = useParams();

  const [messages, sendMessages] = useChannelMessages(orchestraId, channelId);

  const onSend = useCallback(text => {
    sendMessages({
      variables: {
        format: "PLAIN_TEXT",
        context: "CHAT",
        body: text
      }
    });
  }, []);

  if (!messages) {
    return <div>... loading</div>;
  }

  return (
    <MessageBoard
      messages={messages}
      onSend={onSend}
    />
  );
}
