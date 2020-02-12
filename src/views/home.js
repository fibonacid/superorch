import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@apollo/react-hooks";
import { Redirect, useHistory } from "react-router-dom";
import { GET_ORCHESTRAS_QUERY } from "../api/orchestras";

export default function HomeView() {
  const history = useHistory();
  const { token } = useAuth();

  // Errors should be avoided because the client may not be authenticated.
  const { data } = useQuery(GET_ORCHESTRAS_QUERY, {
    errorPolicy: "ignore"
  });

  useEffect(() => {
     if (data) {
        // If user belongs to at least one orchestra:
        if (data.orchestras.length > 0) {
            // Redirect to first orchestra in the list and focus on the "public" channel.
            const [ orchestra ] = data.orchestras;
            const { channels } = orchestra;
            const { _id: channelId } = channels.find(c => c.name === "public");
            history.push(`/orchestras/${orchestra._id}/chats/channel-${channelId}`);
        } else {
           // Else, redirect to orchestra create view.
           history.push(`/orchestras/create`);
        }
     }
  }, [data, history]);

  if (!token) {
    return <Redirect to="/login" />;
  }

  return <div>home view</div>;
}
