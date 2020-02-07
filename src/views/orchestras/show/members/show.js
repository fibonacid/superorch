import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { getMember } from "../../../../api/members";
import usePrivateMessages from "../../../../hooks/usePrivateMessages";
import * as ChatLayout from "../../../../components/_layouts/ChatLayout";
import MessageBoard from "../../../../components/MessageBoard";
import Playground from "../../../../components/Playground";

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


  const onEvaluate = useCallback(console.log, []);

  return (
    <ChatLayout.Wrapper>
      <ChatLayout.Header>{data?.member?.user?.name || "Member"}</ChatLayout.Header>
      <ChatLayout.Container>
        <Playground onEvaluate={onEvaluate}/>
        <MessageBoard messages={messages} onSend={onSend} />
      </ChatLayout.Container>
    </ChatLayout.Wrapper>
  );
}