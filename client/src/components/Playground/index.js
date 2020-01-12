import React from "react";
import styled from "styled-components/macro";
import SCEditor from "../SCEditor";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.h2`
  padding: 10px 5px;
  text-align: center;
  background: whitesmoke;
  border-bottom: solid 1px lightgrey;
`;

function Playground(props) {
  return (
    <StyledContainer>
      <StyledTitle>SuperCollider Editor</StyledTitle>
      <SCEditor />
    </StyledContainer>
  );
}

export default Playground;
