import React, { useEffect, useRef } from "react";
import styled from 'styled-components/macro';
import Message from "../Message";

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
  overflow-y: auto;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 50px;
`;

export default function MessageList({ messages }) {
  const containerRef = useRef(null)

  useEffect(function() {
    if(containerRef) {
      const y = containerRef.current.scrollHeight;
      containerRef.current.scroll(0,y);
    }
  }, [containerRef, messages])

  return (
    <StyledContainer>
      <StyledInner ref={containerRef}>
        <StyledList>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </StyledList>
      </StyledInner>
    </StyledContainer>
  );
}
