import React from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import PrimaryLayout from "../../../components/_layouts/PrimaryLayout";
import CodeEditor from "../../../components/CodeEditor";
import Console from "../../../components/Console";
import SCLogProvider from "../../../components/_providers/SCLogProvider";

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

function OrchestraIndexView() {
  const params = useParams();

  return (
    <PrimaryLayout>
      <StyledInner>
        <SCLogProvider>
          <StyledEditor key={params.id} />
          <StyledConsole />
        </SCLogProvider>
      </StyledInner>
    </PrimaryLayout>
  );
}

export default OrchestraIndexView;
