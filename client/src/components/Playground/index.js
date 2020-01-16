import React from "react";
import styled from "styled-components/macro";
import CodeEditor from "./CodeEditor";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function Playground(props) {
  return (
    <StyledContainer>
      <CodeEditor />
    </StyledContainer>
  );
}

export default Playground;
