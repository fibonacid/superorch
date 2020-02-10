import React from "react";
import styled from "styled-components/macro";
import useFlashMessages from "../../hooks/useFlashMessages";

const StyledList = styled.ul`
  bottom: 10px;
  left: 20px;
  right: 20px; 
  position: absolute;
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.li`
   background: rgba(255,255,0,0.9);
   border: solid 1px lightgrey;
   padding: 10px;
   margin-top: 5px;
   text-align: center;
`;

export default function FlashMessages() {
  const { messages } = useFlashMessages();

  return (
    <StyledList>
      {messages.map((message, index) => (
        <StyledItem key={index}>{message.value}</StyledItem>
      ))}
    </StyledList>
  );
}
