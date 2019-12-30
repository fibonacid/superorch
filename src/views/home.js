import React, { useContext } from "react";
import authContext from "../context/auth-context";
import Frame from "../components/Frame";
import FrameBox from "../components/FrameBox";
import styled from "styled-components";

const StyledSidebar = styled(FrameBox)`
  border-right: solid 1px lightgrey;
`;

const StyledMainbar = styled(FrameBox)``;

function HomeView(props) {

  const { token, userId } = useContext(authContext); 

  return (
    <Frame>
      <StyledSidebar basis="200px">User List</StyledSidebar>
      <StyledMainbar>Hello</StyledMainbar>
    </Frame>
  )
}

export default HomeView;
