import React from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import PrimaryLayout from "../../../components/_layouts/PrimaryLayout";
import CodeEditor from "../../../components/CodeEditor";
import Console from "../../../components/Console";

const StyledContainer = styled.div`
  flex: 1;
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
      <StyledContainer>
        <StyledEditor key={params.id} />
        <StyledConsole />
      </StyledContainer>
    </PrimaryLayout>
  );
}

export default OrchestraIndexView;
