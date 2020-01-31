import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
   flex: 1;
   margin: auto;
   text-align: center;
`;

export default function OrchestraWelcomeView() {
   return (
      <StyledContainer>
         <h1>Welcome !</h1>
         <p>Select an orchestra</p>
      </StyledContainer>
   )
}