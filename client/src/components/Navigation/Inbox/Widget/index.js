import React from "react";
import SideOverlay from "../../../_overlays/SideOverlay";

function Widget() {
  return (
    <SideOverlay>
      <h1>Notifications</h1>
      <ul>
        <li>John invited you to this</li>
        <li>Mary invited you to that</li>
        <li>...</li>
      </ul>
    </SideOverlay>
  );
}

export default Widget;
