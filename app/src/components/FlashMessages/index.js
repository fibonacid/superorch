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
  const { state, dispatch } = useFlashMessages();

  return (
    <StyledList>
      {state.map((message, index) => (
        <Message key={index} message={message} dispatch={dispatch} />
      ))}
    </StyledList>
  );
}
