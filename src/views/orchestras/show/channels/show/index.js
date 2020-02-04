import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useChannelMessages from "../../../../../hooks/useChannelMessages";
import useChannel from "../../../../../hooks/useChannel";
import * as chatLayout from "../../../../../components/_layouts/chatLayout";
import MessageBoard from "../../../../../components/MessageBoard";

export default function OrchestraChannelShowView() {
  const { 
    orchestra: orchestraId,
    channel: channelId 
  } = useParams();

  const channel = useChannel(orchestraId, channelId);
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
    <chatLayout.Container>
      <chatLayout.Header>{channel && channel.name}</chatLayout.Header>
      <MessageBoard
        messages={messages}
        onSend={onSend}
      />
    </chatLayout.Container>
  );
}
