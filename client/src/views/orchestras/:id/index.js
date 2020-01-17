import React from "react";
import styled from "styled-components/macro";
import Sidebar from "../../../components/Sidebar";
import Playground from "../../../components/Playground";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

function OrchestraIndexView() {
  return (
    <StyledContainer>
      <Sidebar />
      <Playground />
    </StyledContainer>
  );
}

export default OrchestraIndexView;
