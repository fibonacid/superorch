import React, { useEffect } from "react";
//import styled from 'styled-components/macro';
import { useQuery } from "@apollo/react-hooks";
import { invitesDocument, newInviteDocument } from "../../../config/documents";
import Item from "./Item";

function Invites() {
  const { subscribeToMore, data } = useQuery(invitesDocument);

  const subscribeToNewInvite = () =>
    subscribeToMore({
      document: newInviteDocument,
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
