import React from "react";
import styled from "styled-components/macro";
import { Switch, Route, useLocation } from "react-router-dom";
import OrchestraManager from "../../components/OrchestraManager";
import Sidebar from "../../components/_miscellaneous/Sidebar";
import Modal from "../../components/_miscellaneous/Modal";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

function OrchestraShowView({ routes }) {
  const location = useLocation();
  let background = location.state && location.state.background;

  return (
    <StyledContainer>
      <Sidebar>
        <OrchestraManager />
      </Sidebar>
      <Switch location={background || location}>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Switch>
      {background && (
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route}>
              <Modal children={<route.component/>}/>
            </Route>
          ))}
        </Switch>
      )}
    </StyledContainer>
  );
}

export default OrchestraShowView;
