import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { notificationsDocument } from "../../../data/documents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Widget from "../../_miscellaneous/Widget";
import Notifications from "../../Notifications";

function Inbox() {
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const { data } = useQuery(notificationsDocument);

  const toggle = () => {
    setVisible(!visible);
  };

  // Count notifications
  useEffect(
    function() {
      if (data) {
        let count = 0;
        for (const key in data) {
          count += data[key].length;
        }
        setTotal(count);
      }
    },
    [data]
  );

  return (
    <div>
      <FontAwesomeIcon
        onClick={toggle}
        icon={faBell}
        color={total > 0 ? "red" : null}
        style={{ cursor: "pointer" }}
      />
      <Widget close={toggle} visible={visible}>
        <Notifications />
      </Widget>
    </div>
  );
}

export default Inbox;
