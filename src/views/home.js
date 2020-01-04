import React, { useContext } from "react";
import authContext from "../context/auth-context";
import Frame from "../components/Frame";
import FrameBox from "../components/FrameBox";
import styled from "styled-components";
import UserList from "../components/UserList";
import Playground from "../components/Playground";

const StyledContainer = styled(Frame)`
  height: 100%;
`;

const StyledSidebar = styled(FrameBox)`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
`;

const StyledMainbar = styled(FrameBox)``;

function HomeView(props) {

  const { token, userId } = useContext(authContext); 

  return (
    <StyledContainer>
      {token &&
        <StyledSidebar grow="0" shrink="1" basis="200px">
          <UserList />
        </StyledSidebar>
      }
      <StyledMainbar>
        <Playground />
      </StyledMainbar>
    </StyledContainer>
  )
}

export default HomeView;
