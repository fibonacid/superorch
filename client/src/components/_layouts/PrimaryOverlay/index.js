import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function PrimaryOverlay({ children }) {
  return <StyledContainer children={children} />;
}

export default PrimaryOverlay;
