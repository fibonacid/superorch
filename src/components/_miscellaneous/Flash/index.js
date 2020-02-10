import React from 'react';
import styled, {keyframes} from 'styled-components/macro';

const appear = keyframes`
   0% { opacity: 0.0 }
   100% { opacity: 0.8 }
`;

const StyledContainer = styled.div`
   position: absolute;
   left: 50%;
   bottom: 10px;
   transform: translateX(-50%);
   background: rgb(255, 255, 0);
   color: black;
   padding: 10px;
   animation: ${appear} 0.5s;
`;

export default function Flash({ children, disappear = true}) {
   return (
      <StyledContainer>
         {children}
      </StyledContainer>
   )
}