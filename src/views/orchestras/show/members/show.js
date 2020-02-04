import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import usePrivateMessages from "../../../../hooks/usePrivateMessages";
import MessageBoard from "../../../../components/MessageBoard";

export default function OrchestraMemberShowView() {
  const { 
    orchestra: orchestraId,
    member: memberId 
  } = useParams();
  const [messages, sendMessages] = usePrivateMessages(orchestraId, memberId);

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
    return <></>;
  }

  return (
    <MessageBoard
      messages={messages}
      onSend={onSend}
    />
  );
}

