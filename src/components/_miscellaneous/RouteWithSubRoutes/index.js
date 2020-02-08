import React, {useContext} from "react";
import { Route } from "react-router-dom";
import { AuthContext } from '../../../context/auth-context';

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
export default function RouteWithSubRoutes(route) {
  const { token } = useContext(AuthContext);

  return (
    <Route
      path={route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} token={token}/>
      )}
    />
  );
}
