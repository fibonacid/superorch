import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useChannel from "../../../../hooks/useChannel";
import useChannelMessages from "../../../../hooks/useChannelMessages";
import MessageBoard from "../../../../components/MessageBoard";
import * as chatLayout from "../../../../components/_layouts/chatLayout";

export default function OrchestraChannelShowView() {
  const { orchestra: orchestraId, channel: channelId } = useParams();

  const [messages, sendMessages] = useChannelMessages(orchestraId, channelId);

  const channel = useChannel(orchestraId, channelId);

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
      <chatLayout.Header>
        {channel ? channel.name : "channel"}
      </chatLayout.Header>
      <MessageBoard messages={messages} onSend={onSend} />
    </chatLayout.Container>
  );
}
