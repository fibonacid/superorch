import React from "react";
import Item from "./Item";

function Invites({ invites }) {
  return (
    <ul>
      {invites.map((invite, i) => (
        <Item key={i} invite={invite} />
      ))}
    </ul>
  );
}

export default Invites;
