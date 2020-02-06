import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { getMember } from "../../../../api/members";
import usePrivateMessages from "../../../../hooks/usePrivateMessages";
import * as chatLayout from "../../../../components/_layouts/chatLayout";
import MessageBoard from "../../../../components/MessageBoard";

export default function OrchestraMemberShowView() {
  const { orchestra: orchestraId, member: memberId } = useParams();

  const { data } = useQuery(getMember, {
    variables: {
      orchestraId,
      memberId
    }
  });

  const [messages, sendMessages] = usePrivateMessages(orchestraId, memberId);
  const onSend = useCallback(text => {
    sendMessages({
      variables: {
        orchestraId,
        memberId,
        format: "PLAIN_TEXT",
        context: "CHAT",
        body: text
      }
    });
  }, []);

  return (
    <chatLayout.Container>
      <chatLayout.Header>{data?.member?.user?.name || "empty"}</chatLayout.Header>
      <MessageBoard messages={messages} onSend={onSend} />
    </chatLayout.Container>
  );
}
