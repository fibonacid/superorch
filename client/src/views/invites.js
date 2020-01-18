import React from "react";
import PrimaryOverlay from "../components/_layouts/PrimaryOverlay";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  color: white;
`;

export default function InvitesView() {
  return (
    <PrimaryOverlay>
      <StyledContainer>Here are my Invites</StyledContainer>
    </PrimaryOverlay>
  );
}
