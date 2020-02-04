import React, { useEffect } from "react";
import { channelMessagesDocument } from "../../../config/documents";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import useChannel from "../../../hooks/useChannel";
import MessageBoard from '../../../components/MessageBoard';

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

  return (
    <div>
      {channel && <h2> {channel.name}</h2>}
      {data && (
        <MessageBoard
          messages={data.channelMessages}
          onSend={console.log}
        />
      )}
      {error && <span>{error.message}</span>}
      {loading && <span>loading ...</span>}
    </div>
  );
}
