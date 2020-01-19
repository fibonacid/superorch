import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  position: relative;
  background: black;
  color: rgb(0, 255, 0);
  padding: 10px;
  font-size: 12px;
  font-family: monospace;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  overflow: auto;
`;

function Console(props) {
  return (
    <StyledContainer className={props.className}>
      <StyledInner>
        <span>$ hello world</span>
      </StyledInner>
    </StyledContainer>
  );
}

export default Console;
