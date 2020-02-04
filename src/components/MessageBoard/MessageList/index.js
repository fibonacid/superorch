import React from "react";
import styled from 'styled-components/macro';
import ListItem from "./ListItem";

const StyledContainer = styled.div`
   flex: 1;
   position: relative;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export default function MessageList({ messages }) {
  return (
    <StyledContainer>
      <StyledInner>
        <StyledList>
          {messages.map((message, index) => (
            <ListItem key={index} message={message} />
          ))}
        </StyledList>
      </StyledInner>
    </StyledContainer>
  );
}
