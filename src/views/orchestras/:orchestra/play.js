import React from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import CodeEditor from "../../../components/CodeEditor";
import Console from "../../../components/Console";
import SCLogProvider from "../../../components/_providers/SCLogProvider";

const StyledWrapper = styled.div`
  flex: 1;
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

function OrchestraPlayView() {
  const params = useParams();

  return (
    <StyledWrapper>
      <StyledInner>
        <SCLogProvider>
          <StyledEditor key={params.orchestra} />
          <StyledConsole />
        </SCLogProvider>
      </StyledInner>
    </StyledWrapper>
  );
}

export default OrchestraPlayView;
