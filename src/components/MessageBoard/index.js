import React from "react";
import styled from "styled-components/macro";
import MessageList from "./MessageList";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export default function MessageBoard({ messages, onSend }) {
  return (
    <StyledContainer>
      <MessageList messages={messages} />
      <div>
        <input></input>
        <button>Send</button>
      </div>
    </StyledContainer>
  );
}
