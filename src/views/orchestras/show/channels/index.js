import React from "react";
import {Switch, useParams} from 'react-router-dom';
import useChannel from "../../../../hooks/useChannel";
import RouteWithSubRoutes from '../../../../components/_miscellaneous/RouteWithSubRoutes';
import * as chatLayout from "../../../../components/_layouts/chatLayout";

function OrchestraChannelIndexView({ routes }) {
  const { 
    orchestra: orchestraId,
    channel: channelId 
  } = useParams();
  
  const channel = useChannel(orchestraId, channelId);

  return (
    <chatLayout.Container>
      <chatLayout.Header>{channel ? channel.name : "channel"}</chatLayout.Header>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </chatLayout.Container>
  );
}

export default OrchestraChannelIndexView;