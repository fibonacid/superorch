import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useChat from "../../../../hooks/useChat";
import * as chatLayout from "../../../../components/_layouts/chatLayout";
import Playground from "../../../../components/Playground";
import MessageBoard from "../../../../components/MessageBoard";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

export default function OrchestraChatShowView() {
  const { orchestra, chat } = useParams();
  const [type, id] = chat.split("-");

  const { title, messages } = useChat(orchestra, type, id);

  return (
    <chatLayout.Container>
      <chatLayout.Header>{title}</chatLayout.Header>
      <StyledContainer>
        <Playground />
        <MessageBoard messages={messages} onSend={() => {}} />
      </StyledContainer>
    </chatLayout.Container>
  );

  //   const { orchestra: orchestraId, member: memberId } = useParams();

  //   const member = useMember(orchestraId, memberId);
  //   const [messages, sendMessages] = usePrivateMessages(orchestraId, memberId);

  //   const onSend = useCallback(text => {
  //     sendMessages({
  //       variables: {
  //         format: "PLAIN_TEXT",
  //         context: "CHAT",
  //         body: text
  //       }
  //     });
  //   }, []);

  //   if (!messages) {
  //     return <></>;
  //   }

  //   return (
  //     <chatLayout.Container>
  //       <chatLayout.Header>{member?.user?.name}</chatLayout.Header>
  //       <StyledContainer>
  //         <MessageBoard messages={messages} onSend={onSend} />
  //         <Playground />
  //       </StyledContainer>
  //     </chatLayout.Container>
  //   );
}
