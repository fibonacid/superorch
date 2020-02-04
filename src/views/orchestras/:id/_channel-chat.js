import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import useChannel from "../../../hooks/useChannel";
import { channelMessagesDocument } from "../../../config/documents";

export default function ChannelChatView({ channelId }) {
  const params = useParams();
  const orchestraId = params.id;

  const channel = useChannel(orchestraId, channelId);

  const { data, loading, error } = useQuery(channelMessagesDocument, {
    variables: {
      orchestraId,
      channelId
    }
  });

  useEffect(() => {
     console.log(data)
  }, [data]);

  return (
    <div>
      {channel && <h2> {channel.name}</h2>}
      {data && (
         data.channelMessages.map((message, index) => (
            <div key={index}>
               <span>{message.from.user.name} sent: </span>
               <span>{message.body}</span>
            </div>
         ))
      )}
      {error && <span>{error.message}</span>}
      {loading && <span>loading ...</span>}
    </div>
  );
}
