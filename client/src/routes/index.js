import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth-context";
import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";
import CreateOrchestraView from "../views/orchestras/create";

export default function Routes() {
  return (
    <AuthContext.Consumer>
      {({ token }) => (
        <>
          {token && <Redirect from="/login" to="/" />}
          {!token && <Redirect from="/" to="/login" />}
          <Route path="/login" exact component={LoginView} />
          <Route path="/register" exact component={RegisterView} />
          <Route
            path="/orchestras/create"
            exact
            component={CreateOrchestraView}
          />
          <Route path="/" exact component={HomeView} />
        </>
      )}
    </AuthContext.Consumer>
  );
}
