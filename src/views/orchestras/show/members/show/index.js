import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import usePrivateMessages from "../../../../../hooks/usePrivateMessages";
import useMember from "../../../../../hooks/useMember";
import * as chatLayout from "../../../../../components/_layouts/chatLayout";
import MessageBoard from "../../../../../components/MessageBoard";

export default function OrchestraMemberShowView() {
  const { orchestra: orchestraId, member: memberId } = useParams();
  const [messages = [], sendMessages] = usePrivateMessages(orchestraId, memberId);

  const member = useMember(orchestraId, memberId);

  const onSend = useCallback(text => {
    sendMessages({
      variables: {
        format: "PLAIN_TEXT",
        context: "CHAT",
        body: text
      }
    });
  }, []);

  return (
    <chatLayout.Container>
      <chatLayout.Header>{member?.user?.name}</chatLayout.Header>
      <MessageBoard messages={messages} onSend={onSend} />
    </chatLayout.Container>
  );
}
