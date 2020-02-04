import React from 'react';
import styled from 'styled-components/macro';
import useSearchParams from '../../../hooks/useSearchParams';
import ChannelChatView from "./_channel-chat";
import PrivateChatView from "./_private-chat";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function OrchestraChatView() {
   const params = useSearchParams();

   const type = params.get("type");
   const id = params.get("id");

   return (
      <StyledContainer>
         {type === "channel" && <ChannelChatView channelId={id} />}
         {type === "private" && <PrivateChatView memberId={id} /> }
      </StyledContainer>
   )
}