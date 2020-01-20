import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Widget from "../../_ui/Widget";
import Notifications from "../../Notifications";

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
        style={{ cursor: "pointer" }}
      />
      {visible && (
        <Widget close={toggle}>
          <Notifications />
        </Widget>
      )}
    </div>
  );
}

export default Inbox;
