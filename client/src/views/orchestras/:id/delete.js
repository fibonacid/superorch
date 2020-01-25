import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: red;
`;

function DeleteOrchestraView() {
  return <StyledContainer>Are you sure ?</StyledContainer>;
}

export default DeleteOrchestraView;
