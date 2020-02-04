import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import useMember from '../../../hooks/useMember';
import { privateMessagesDocument } from "../../../config/documents";

export default function PrivateChatView({ memberId }) {
  const params = useParams();
  const orchestraId = params.id;

  const member = useMember(orchestraId, memberId);

  const {data, loading, error} = useQuery(privateMessagesDocument, {
    variables: {
      orchestraId,
      memberId
    }
  });

  return (
    <div>
      <span>this is a private chat</span>
      {member && <span> with {member.user.name}</span>}
      {data && (
         data.privateMessages.map((message, index) => (
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
