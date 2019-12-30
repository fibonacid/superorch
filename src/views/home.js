import React, { useContext } from "react";
import authContext from "../context/auth-context";
import Frame from "../components/Frame";
import FrameBox from "../components/FrameBox";
import styled from "styled-components";
import UserList from "../components/UserList";
import Playground from "../components/Playground";

const StyledSidebar = styled(FrameBox)`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
`;

const StyledMainbar = styled(FrameBox)`
  height: 100%;
`;

function HomeView(props) {

  const { token, userId } = useContext(authContext); 

  return (
    <Frame>
      <StyledSidebar grow="0" shrink="1" basis="200px">
        {token ? <UserList /> : null }
      </StyledSidebar>
      <StyledMainbar>
        <Playground />
      </StyledMainbar>
    </Frame>
  )
}

export default HomeView;
