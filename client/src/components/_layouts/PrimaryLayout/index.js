import React from "react";
import styled from "styled-components/macro";
import Sidebar from "../../Sidebar";

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const StyledContainer = styled.section`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

function PrimaryLayout(props) {
  return (
    <StyledWrapper>
      <Sidebar />
      <StyledContainer>{props.children}</StyledContainer>
    </StyledWrapper>
  );
}

export default PrimaryLayout;
