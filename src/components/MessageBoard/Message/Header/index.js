import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
   display: flex;
   justify-content: space-between;
`;

const StyledUsername = styled.span`
   color: blue;
   font-size: 13px;
   padding-bottom: 5px;
   font-weight: bold;
`;

export default function Header({ username, showUsername, clipboard = false, children }) {
   return (
      <StyledContainer>
         {showUsername && <StyledUsername>{username}</StyledUsername>}
         {children}
      </StyledContainer>
   )
}