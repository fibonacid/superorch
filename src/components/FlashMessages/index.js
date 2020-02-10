import React from "react";
import styled from "styled-components/macro";
import useFlashMessages from "../../hooks/useFlashMessages";
import Message from "./Message";

const StyledList = styled.ul`
  bottom: 10px;
  left: 50px;
  right: 50px;
  position: absolute;
  display: flex;
  flex-direction: column-reverse;
`;

export default function FlashMessages() {
  const { messages, removeMessage } = useFlashMessages();

  return (
    <StyledList>
      {messages.map((message, index) => (
        <Message key={index} message={message} onRemove={removeMessage} />
      ))}
    </StyledList>
  );
}
