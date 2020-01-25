import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AuthContext from "../context/auth-context";
import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";
import CreateOrchestraView from "../views/orchestras/create";
import EditOrchestraView from "../views/orchestras/:id/edit";
import OrchestraView from "../views/orchestras/:id";
import InvitesOrchestraView from "../views/orchestras/:id/invites";
import DeleteOrchestraView from "../views/orchestras/:id/delete";

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
    console.log("pageview", location.pathname);
  }, [location]);

  return (
    <>
      <Switch location={background || location}>
        <Route
          exact
          path="/login"
          children={!token ? <LoginView /> : <Redirect to="/" />}
        />
        <Route
          exact
          path="/register"
          children={!token ? <RegisterView /> : <Redirect to="/" />}
        />
        {!token && <Redirect to="/login" />}

        {/* ----- Only logged in pages ----- */}

        <Route
          exact
          path="/orchestras/create"
          children={<CreateOrchestraView />}
        />
        <Route
          exact
          path="/orchestras/:id/edit"
          children={<EditOrchestraView />}
        />
        <Route
          exact
          path="/orchestras/:id/invites"
          children={<InvitesOrchestraView />}
        />
        <Route exact path="/orchestras/:id" children={<OrchestraView />} />
        <Route exact path="/" children={<HomeView />} />
      </Switch>

      {/* Show the following views as overlays when a background page is set */}
      {background && (
        <Route
          path="/orchestras/:id/delete"
          children={<DeleteOrchestraView />}
        />
      )}
    </>
  );
}
