import React, { useContext } from "react";
import styled from "styled-components/macro";
import authContext from "../context/auth-context";
import UserList from "../components/UserList";
import Playground from "../components/Playground";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

const StyledSidebar = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
`;

function HomeView(props) {
  return (
    <StyledContainer>
      <StyledSidebar>
        <UserList />
      </StyledSidebar>
      <Playground />
    </StyledContainer>
  );
}

export default HomeView;
