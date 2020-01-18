import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  background: black;
  color: rgb(0, 255, 0);
  padding: 10px;
  font-size: 12px;
  font-family: monospace;
`;

function Console(props) {
  return (
    <StyledContainer className={props.className}>$ hello world</StyledContainer>
  );
}

export default Console;
