import React from "react";
import {Switch, useParams} from 'react-router-dom';
import useMember from "../../../../hooks/useMember";
import * as chatLayout from "../../../../components/_layouts/chatLayout";
import RouteWithSubRoutes from '../../../../components/_miscellaneous/RouteWithSubRoutes';

function OrchestraMemberIndexView({ routes }) {
  const { 
    orchestra: orchestraId,
    member: memberId 
  } = useParams();

  const member = useMember(orchestraId, memberId);

  // if(!member) {
  //   return <div>... loading</div>
  // }

  return (
    <chatLayout.Container>
      <chatLayout.Header>member</chatLayout.Header>
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </chatLayout.Container>
  );
}

export default OrchestraMemberIndexView;