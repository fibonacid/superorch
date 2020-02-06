import React, { useEffect } from "react";
//import styled from 'styled-components/macro';
import { useQuery } from "@apollo/react-hooks";
import { GET_INVITES_QUERY, NEW_INVITE_SUBSCRIPTION } from "../../../api/invites";
import Item from "./Item";

function Invites() {
  const { subscribeToMore, data } = useQuery(GET_INVITES_QUERY);

  const subscribeToNewInvite = () =>
    subscribeToMore({
      document: NEW_INVITE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { newInvite } = subscriptionData.data;

        return {
          invites: [...prev.invites, newInvite]
        };
      }
    });

  useEffect(subscribeToNewInvite, []);

  return (
    <ul>
      {data && data.invites.map((invite, i) => <Item key={i} invite={invite} />)}
    </ul>
  );
}

export default Invites;
