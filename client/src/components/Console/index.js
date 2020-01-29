import React from "react";
import styled from "styled-components/macro";
import SCLogContext from "../../context/sclog-context";

const StyledContainer = styled.div`
  position: relative;
  background: black;
  padding: 10px;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  overflow: auto;
`;

const StyledSpan = styled.span`
  line-height: 1.2em;
  display: block;
  color: rgb(0, 255, 0);
  font-size: 12px;
  font-family: monospace;
`;

function Line({ line }) {
  return (
    <>
      {line.type === "stdin" && <StyledSpan>> {line.value}</StyledSpan>}
      {line.type === "stdout" && <StyledSpan>{line.value}</StyledSpan>}
    </>
  );
}

function Console(props) {
  return (
    <SCLogContext.Consumer>
      {value => (
        <StyledContainer className={props.className}>
          <StyledInner>
            {value.lines.map((line, i) => (
              <Line key={i} line={line} />
            ))}
          </StyledInner>
        </StyledContainer>
      )}
    </SCLogContext.Consumer>
  );
}

export default Console;
