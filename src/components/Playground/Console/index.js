import React from "react";
import styled from "styled-components/macro";
import useSclang from "../../../hooks/useSClang";

const StyledWrapper = styled.div`
  position: relative;
  background: black;
  padding: 10px;
  flex: 0 1 25%;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
`;

const StyledContainer = styled.div`
  padding: 10px 0 0 10px;
  position: absolute;
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
  const { state } = useSclang();

  return (
    <StyledWrapper className={props.className}>
      <StyledInner>
        <StyledContainer>
          {state.logs.map((line, i) => (
            <Line key={i} line={line} />
          ))}
          }
        </StyledContainer>
      </StyledInner>
    </StyledWrapper>
  );
}

export default Console;
