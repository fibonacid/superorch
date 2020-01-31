import React from 'react';
import styled from 'styled-components/macro';
import useUsername from "../../hooks/useUsername";

const StyledContainer = styled.div`
   flex: 1;
   margin: auto;
   text-align: center;
`;

export default function OrchestraWelcomeView() {
   const username = useUsername();

   return (
      <StyledContainer>
         <h1>Welcome {username}</h1>
      </StyledContainer>
   )
}