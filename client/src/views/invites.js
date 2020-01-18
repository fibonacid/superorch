import React from "react";
import FullScreenOverlay from "../components/_overlays/FullScreenOverlay";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export default function InvitesView() {
  return (
    <FullScreenOverlay>
      <StyledContainer>
        <h1>My Invites</h1>
        <ol>
          <li>bla</li>
          <li>bla</li>
          <li>bla</li>
          <li>bla</li>
          <li>bla</li>
        </ol>
      </StyledContainer>
    </FullScreenOverlay>
  );
}
