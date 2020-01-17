import React from "react";
import styled from "styled-components/macro";
import Sidebar from "../../components/Sidebar";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

function EditOrchestraView() {
  return (
    <StyledContainer>
      <Sidebar />
      <div>Edit Orchestra</div>
    </StyledContainer>
  );
}

export default EditOrchestraView;
