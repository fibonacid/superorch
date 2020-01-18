import React from "react";
import styled from "styled-components/macro";

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledTitle = styled.h1`
  text-align: center;
`;

function HomeView() {
  return (
    <StyledWrapper>
      <div>
        <StyledTitle>Welcome</StyledTitle>
      </div>
    </StyledWrapper>
  );
}

export default HomeView;
