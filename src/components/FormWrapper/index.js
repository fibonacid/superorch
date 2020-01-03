import React from 'react';
import styled from 'styled-components';

const StyledWrap = styled.div`
  padding: 10px;
`;

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

function FormWrapper(props) {
   return (
      <StyledWrap>
         <StyledTitle>{props.title}</StyledTitle>
         {props.children}
      </StyledWrap>
   )
}

export default FormWrapper;

