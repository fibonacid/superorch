import React from "react";
import Authentication from "./Authentication";
import Activity from "./Activity";

export default function Store(props) {
  return (
    <Authentication>
      <Activity>{props.children}</Activity>
    </Authentication>
  );
}
