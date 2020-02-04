import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import useMember from "../../../hooks/useMember";
import { privateMessagesDocument } from "../../../config/documents";
import MessageBoard from "../../../components/MessageBoard";

export default function PrivateChatView({ memberId }) {
  const params = useParams();
  const orchestraId = params.id;

  const member = useMember(orchestraId, memberId);

  const { data, loading, error } = useQuery(privateMessagesDocument, {
    variables: {
      orchestraId,
      memberId
    }
  });

  return (
    <>
      <span>this is a private chat</span>
      {member && <span> with {member.user.name}</span>}
      {data && (
        <MessageBoard messages={data.privateMessages} onSend={console.log} />
      )}
      {error && <span>{error.message}</span>}
      {loading && <span>loading ...</span>}
    </>
  );
}
