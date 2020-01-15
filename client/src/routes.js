import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./context/auth-context";
import HomeView from "./views/home";
import LoginView from "./views/login";
import RegisterView from "./views/register";
import CreateOrchestraView from "./views/orchestras/create";

export default function Routes() {
  const { token } = useContext(AuthContext);

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
      <Route exact path="/">
        <HomeView />
      </Route>
    </Switch>
  );
}
