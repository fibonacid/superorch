import React from "react";
import styled from "styled-components/macro";
import { soundTest } from "../helpers/electron";

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTitle = styled.h1`
  text-align: center;
  cursor: pointer;
`;

function HomeView() {
  return (
    <StyledWrapper>
      <StyledTitle onClick={soundTest}>Welcome</StyledTitle>
    </StyledWrapper>
  );
}

export default HomeView;
