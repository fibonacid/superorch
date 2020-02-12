import React, { useCallback } from "react";
import styled from "styled-components/macro";
import MessageList from "./MessageList";
import InputBox from './InputBox';

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: lightgrey;
  border-left: solid 1px lightgrey; 
`;

export default function MessageBoard({ className, messages, onSend, fetchMore }) {
  const getMore = useCallback(() => {
    if (messages?.length) {
      const oldest = messages[messages.length - 1];
      const cursor = oldest._id;
      fetchMore(cursor)
    }
  }, [messages, fetchMore]); 

  return (
    <StyledContainer className={className}>
      <MessageList messages={messages} />
      <button onClick={getMore}>FETCH MORE</button>
      <InputBox onSend={onSend} />
    </StyledContainer>
  );
}
