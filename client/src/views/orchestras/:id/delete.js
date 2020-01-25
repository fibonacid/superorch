import React from "react";
import styled from "styled-components/macro";
import { useMutation } from "@apollo/react-hooks";
import { deleteOrchestraDocument } from "../../../data/documents";
import PrimaryOverlay from "../../../components/_layouts/PrimaryOverlay";

const StyledContainer = styled.div`
  background: white;
  padding: 10px;
`;

function DeleteOrchestraView() {
  return (
    <PrimaryOverlay>
      <StyledContainer>Are you sure ?</StyledContainer>
    </PrimaryOverlay>
  );
}

export default DeleteOrchestraView;
