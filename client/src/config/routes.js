import React, { useEffect, useContext } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AuthContext from "../context/auth-context";
import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";
import CreateOrchestraView from "../views/orchestras/create";
import EditOrchestraView from "../views/orchestras/:id/edit";
import OrchestraView from "../views/orchestras/:id";

export default function Routes() {
  const { token } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    console.log("pageview", location.pathname);
  }, [location]);

  return (
    <Switch>
      <Route exact path="/login">
        {!token ? <LoginView /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/register">
        <RegisterView />
      </Route>

      {!token && <Redirect to="/login" />}

      {/* ----- Only logged in pages ----- */}

      <Route exact path="/orchestras/create">
        <CreateOrchestraView />
      </Route>
      <Route exact path="/orchestras/:id/edit">
        <EditOrchestraView />
      </Route>
      <Route exact path="/orchestras/:id">
        <OrchestraView />
      </Route>
      <Route exact path="/">
        <HomeView />
      </Route>
    </Switch>
  );
}
