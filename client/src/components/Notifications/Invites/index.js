import React from "react";
//import styled from 'styled-components/macro';
import { useQuery } from "@apollo/react-hooks";
import { invitesDocument } from "../../../data/documents";
import Item from "./Item";

function Invites() {
  const { data } = useQuery(invitesDocument);

  return (
    <ul>
      {data &&
        data.invites.map((invite, i) => <Item key={i} invite={invite} />)}
    </ul>
  );
}

export default Invites;
