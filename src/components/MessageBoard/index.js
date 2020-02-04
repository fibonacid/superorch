import React from "react";
import styled from "styled-components/macro";
import MessageList from "./MessageList";
import InputBox from './InputBox';

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgb(231, 221, 212);
`;

export default function MessageBoard({ messages, onSend }) {
  return (
    <StyledContainer>
      <MessageList messages={messages} />
      <InputBox onSend={onSend} />
    </StyledContainer>
  );
}
