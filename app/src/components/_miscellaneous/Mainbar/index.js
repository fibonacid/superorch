import React from 'react';
import styled from 'styled-components/macro'

const StyledContainer = styled.div`
   flex: 1;
   display: flex;
   position: relative;
`;

export default function Mainbar(props) {
   return (
      <StyledContainer>
         {props.children}
      </StyledContainer>
   )
}