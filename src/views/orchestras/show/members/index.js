import React from "react";
import {Switch} from 'react-router-dom';
import RouteWithSubRoutes from '../../../../components/_miscellaneous/RouteWithSubRoutes';

function OrchestraMemberIndexView({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  );
}

export default OrchestraMemberIndexView;