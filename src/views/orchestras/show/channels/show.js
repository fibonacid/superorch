import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import useChannel from "../../../../hooks/useChannel";
import useChannelMessages from "../../../../hooks/useChannelMessages";
import MessageBoard from "../../../../components/MessageBoard";
import * as chatLayout from "../../../../components/_layouts/chatLayout";

export default function OrchestraChannelShowView() {
  const { orchestra: orchestraId, channel: channelId } = useParams();

  console.log({orchestraId, channelId});

  const [messages, sendMessages] = useChannelMessages(orchestraId, channelId);

  //const channel = useChannel(orchestraId, channelId);

  const onSend = useCallback(text => {
    sendMessages({
      variables: {
        orchestraId,
        channelId,
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
        {channelId}
      </chatLayout.Header>
      <MessageBoard messages={messages} onSend={onSend} />
    </chatLayout.Container>
  );
}
