import React, { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  GET_INVITES_QUERY,
  NEW_INVITE_SUBSCRIPTION
} from "../../../api/invites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Widget from "../../_miscellaneous/Widget";
import Invites from "./Invites";

function Inbox() {
  const { subscribeToMore, data } = useQuery(GET_INVITES_QUERY);
  const subscribeToNewInvite = useCallback(
    () =>
      subscribeToMore({
        document: NEW_INVITE_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const { newInvite } = subscriptionData.data;

          return {
            invites: [...prev.invites, newInvite]
          };
        }
      }),
    []
  );

  useEffect(() => {
    // subscribe when stack is empty, just in case
    setTimeout(subscribeToNewInvite, 0);
  }, []);

  const [visible, setVisible] = useState(false);

  const toggle = useCallback(
    function() {
      setVisible(!visible);
    },
    [visible]
  );

  // Parse invites
  const invites = data?.invites || [];
  const total = invites?.length || 0;

  return (
    <div>
      <FontAwesomeIcon
        icon={faBell}
        onClick={toggle}
        color={total > 0 ? "red" : null}
        style={{ cursor: "pointer" }}
      />
      <Widget close={toggle} visible={visible}>
        <Invites invites={invites} />
      </Widget>
    </div>
  );
}

export default Inbox;
