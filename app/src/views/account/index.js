import React from "react";
import styled from "styled-components/macro";
import { Switch, Route } from "react-router-dom";
import Sidebar from '../../components/_miscellaneous/Sidebar';
import AccountNav from "../../components/AccountNav";

const StyledContainer = styled.div`
   flex: 1;
   display: flex;
`;

export default function AccountIndexView({ routes }) {
  return (
    <StyledContainer>
      <Sidebar>
         <AccountNav />
      </Sidebar>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
    </StyledContainer>
  );
}
