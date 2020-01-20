import React from "react";
//import styled from 'styled-components/macro';
import { useQuery } from "@apollo/react-hooks";
import { invitesDocument } from "../../../data/documents";

function Invites() {
  const { data, error } = useQuery(invitesDocument);

  return (
    <ul>
      {data && data.invites.map(invite => <li>{invite._id}</li>)}
      {error && <span>{error.message}</span>}
    </ul>
  );
}

export default Invites;
