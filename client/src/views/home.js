import React from "react";
import styled from "styled-components/macro";
import Sidebar from "../components/Sidebar";
import Playground from "../components/Playground";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

function HomeView() {
  return <StyledContainer>Welcome to Superorch</StyledContainer>;
}

export default HomeView;
