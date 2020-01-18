import React from "react";
import styled from "styled-components/macro";
import SideOverlay from "../components/_overlays/SideOverlay";

const StyledTitle = styled.h3`
  font-size: 18px;
`;

export default function InvitesView() {
  return (
    <SideOverlay>
      <StyledTitle>My Invites</StyledTitle>
      <ol>
        <li>bla</li>
        <li>bla</li>
        <li>bla</li>
        <li>bla</li>
        <li>bla</li>
      </ol>
    </SideOverlay>
  );
}
