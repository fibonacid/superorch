import React from "react";
import { Route } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export default function RouteWithSubRoutes(route) {
  const { token } = useAuth();

  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} token={token} />
      )}
    />
  );
}
