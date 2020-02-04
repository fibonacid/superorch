import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
   display: flex;
`;

const StyledInput = styled.textarea`
   flex: 1;
   resize: none;
`;

export default function InputBox({ onSend }) {
  return (
    <StyledContainer>
      <StyledInput></StyledInput>
      <button>Send</button>
    </StyledContainer>
  );
}
