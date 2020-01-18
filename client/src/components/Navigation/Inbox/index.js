import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Widget from "../../_ui/Widget";

function Inbox(props) {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <FontAwesomeIcon
        onClick={toggle}
        icon={faBell}
        size="2x"
        style={{ cursor: "pointer" }}
      />
      {visible && (
        <Widget close={toggle}>
          <h1>Notifications</h1>
          <ul>
            <li>John invited you to this</li>
            <li>Mary invited you to that</li>
            <li>...</li>
          </ul>
        </Widget>
      )}
    </div>
  );
}

export default Inbox;
