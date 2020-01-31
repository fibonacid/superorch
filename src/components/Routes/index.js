import React, { useEffect, useContext } from "react";
import styled from "styled-components/macro";
import { Switch, Route, useLocation } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import routes from "../../config/routes";

import Sidebar from "../_miscellaneous/Sidebar";
import Mainbar from "../_miscellaneous/Mainbar";
import Modal from "../_miscellaneous/Modal";

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
`;

export default function Routes() {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  // This piece of state is set when one of the
  // menu links is clicked. The `background` state
  // is the location that we were at when one of
  // the menu links was clicked. If it's there,
  // use it as the location for the <Switch> so
  // we show the overlay in the background, behind
  // the modal.
  let background = location.state && location.state.background;

  useEffect(() => {
    console.log("pageview", location);
    console.log("background", background || undefined);
  }, [location]);

  return (
    <StyledWrapper>
      <Sidebar>
        <Switch>
          {routes.map((route, index) => (
            // You can render a <Route> in as many places
            // as you want in your app. It will render along
            // with any other <Routes> that also match the URL.
            // So, a sidebar or breadcrumbs or anything else
            // that requires you to render multiple things
            // in multiple places at the same URL is nothing
            // more than multiple <Routes>.
            <Route key={index} path={route.path} exact={route.exact}>
              {route.sidebar && (
                <Sidebar
                  key={index}
                  children={<route.sidebar token={token} />}
                />
              )}
            </Route>
          ))}
        </Switch>
      </Sidebar>
      <Mainbar>
        <Switch location={background || location}>
          {routes.map((route, index) => (
            // Render more <Routes> with the same paths as
            // above, but different components this time.
            <Route key={index} path={route.path} exact={route.exact}>
              {route.main && (
                <Mainbar children={<route.main token={token} />} />
              )}
            </Route>
          ))}
        </Switch>
      </Mainbar>
      {background && (
        <Switch>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact}>
              {route.modal && <Modal children={<route.modal />} />}
            </Route>
          ))}
          }
        </Switch>
      )}
    </StyledWrapper>
  );
}
