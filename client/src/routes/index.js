import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth-context";
import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";

export default function Routes() {
  return (
    <AuthContext.Consumer>
      {({ token }) => (
        <>
          <Route path="/login" exact component={LoginView} />
          <Route path="/register" exact component={RegisterView} />
          {!token && <Redirect from="/" to="/login" />}
          <Route path="/" exact component={HomeView} />
        </>
      )}
    </AuthContext.Consumer>
  );
}
