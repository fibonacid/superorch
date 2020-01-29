import React, { useContext } from "react";
import styled from "styled-components/macro";
import SCLogContext from "../../context/sclog-context";

const StyledWrapper = styled.div`
  position: relative;
  background: black;
  padding: 10px;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: auto;
`;

const StyledContainer = styled.div`
  margin: 10px;
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
  const { lines } = useContext(SCLogContext);

  return (
    <StyledWrapper className={props.className}>
      <StyledInner>
        <StyledContainer>
          {lines.map((line, i) => (
            <Line key={i} line={line} />
          ))}
          }
        </StyledContainer>
      </StyledInner>
    </StyledWrapper>
  );
}

export default Console;
