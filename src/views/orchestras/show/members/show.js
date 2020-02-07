import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { getMember } from "../../../../api/members";
import usePrivateMessages from "../../../../hooks/usePrivateMessages";
import * as ChatLayout from "../../../../components/_layouts/ChatLayout";
import MessageBoard from "../../../../components/MessageBoard";
import Console from "../../../../components/Console";
import CodeEditor from "../../../../components/CodeEditor";
import SCLogProvider from '../../../../components/_providers/SCLogProvider'

export default function OrchestraMemberShowView() {
  const { orchestra: orchestraId, member: memberId } = useParams();

  const { data } = useQuery(getMember, {
    variables: {
      orchestraId,
      memberId
    }
  });

  const [messages, sendMessages] = usePrivateMessages(orchestraId, memberId, ["CHAT"]);
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

  const onEvaluate = useCallback(text => {
    sendMessages({
      variables: {
        orchestraId,
        memberId,
        format: "SC_LANG",
        context: "SUPERCOLLIDER",
        body: text
      }
    });
  }, []);

  return (
    <ChatLayout.Wrapper>
      <ChatLayout.Header>
        {data?.member?.user?.name}
      </ChatLayout.Header>
      <SCLogProvider>
        <ChatLayout.Container>
          <CodeEditor onEvaluate={onEvaluate}/>
          <MessageBoard messages={messages} onSend={onSend} />
        </ChatLayout.Container>
        <Console />
      </SCLogProvider>
    </ChatLayout.Wrapper>
  );
}
