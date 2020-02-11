import React, {useEffect} from "react";
import { Switch, useLocation } from "react-router-dom";
import routes from "../../config/routes";
import RouteWithSubRoutes from '../_miscellaneous/RouteWithSubRoutes';
import { SClangProvider } from '../../context/sclang-context';

export default function RootSwitch() {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
  }, [location.pathname]);

  return (
    <SClangProvider>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </SClangProvider>
  )
}