import React from 'react';
import styled from 'styled-components/macro'

const StyledContainer = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
`;

export default function Sidebar(props) {
   return (
      <StyledContainer>
         {props.children}
      </StyledContainer>
   )
}