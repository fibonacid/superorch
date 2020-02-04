import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
   flex: 1;
`;

export default function MessageList({ messages }) {
   return (
      <StyledContainer>
         {messages.map((message, index) => (
            <div key={index}>
               <span>{message.from.user.name} sent: </span>
               <span>{message.body}</span>
            </div>
         ))}
      </StyledContainer>
   )
}