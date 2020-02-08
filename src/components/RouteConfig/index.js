import React, {useEffect} from "react";
import { Switch, useLocation } from "react-router-dom";
import routes from "../../config/routes";
import RouteWithSubRoutes from '../_miscellaneous/RouteWithSubRoutes';

export default function RouteConfig() {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
  }, [location.pathname]);

  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  )
}