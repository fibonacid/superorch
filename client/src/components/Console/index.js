import React from "react";
import styled from "styled-components/macro";
import SCLogContext from "../../context/sclog-context";

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

function Line({ line }) {
  return (
    <>
      {line.type === "stdin" && <p>> {line.value}</p>}
      {line.type === "stdout" && <p>{line.value}</p>}
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
