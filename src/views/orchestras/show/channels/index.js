import React from "react";
import {Switch, useParams} from 'react-router-dom';
import RouteWithSubRoutes from '../../../../components/_miscellaneous/RouteWithSubRoutes';

function OrchestraChannelIndexView({ routes }) {
  return (
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
  );
}

export default OrchestraChannelIndexView;