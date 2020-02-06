import React from "react";
import styled from "styled-components/macro";
import MessageList from "./MessageList";
import InputBox from './InputBox';

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgb(231, 221, 212);
  flex: 0 1 300px;
`;

export default function MessageBoard({ className, messages, onSend }) {
  return (
    <StyledContainer className={className}>
      <MessageList messages={messages} />
      <InputBox onSend={onSend} />
    </StyledContainer>
  );
}
