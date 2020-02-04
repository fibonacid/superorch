import React from "react";
import styled from 'styled-components/macro';
import ListItem from "./ListItem";

const StyledContainer = styled.div`
   flex: 1;
   margin: 10px 5px;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default function MessageList({ messages }) {
  return (
    <StyledContainer>
      <StyledList>
        {messages.map((message, index) => (
          <ListItem key={index} message={message} />
        ))}
      </StyledList>
    </StyledContainer>
  );
}
