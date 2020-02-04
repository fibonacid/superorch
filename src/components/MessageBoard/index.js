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

const StyledTitle = styled.h2`
   text-align: center;
   padding: 5px 0;
   background: whitesmoke;
   border-bottom: solid 1px lightgrey;
`;

export default function MessageBoard({ title, messages, onSend }) {
  return (
    <StyledContainer>
      <StyledTitle>{title}</StyledTitle>
      <MessageList messages={messages} />
      <InputBox onSend={onSend} />
    </StyledContainer>
  );
}
