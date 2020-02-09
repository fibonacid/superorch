import React from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Console from "./Console";
import { SCLogProvider } from "../../context/sclog-context";

const StyledWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const StyledInner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledEditor = styled(CodeEditor)`
  flex: 1;
`;

const StyledConsole = styled(Console)`
  flex: 0 1 30%;
`;

function Playground({ onEvaluate }) {
  const params = useParams();

  return (
    <StyledWrapper>
      <StyledInner>
        <SCLogProvider>
          <StyledEditor key={params.orchestra} onEvaluate={onEvaluate}/>
          <StyledConsole />
        </SCLogProvider>
      </StyledInner>
    </StyledWrapper>
  );
}

export default Playground;
