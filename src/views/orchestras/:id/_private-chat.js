import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { memberByIdDocument } from "../../../config/documents";

export default function PrivateChatView({ memberId }) {
  const params = useParams();
  const orchestraId = params.id;

  const { data, loading, error } = useQuery(memberByIdDocument, {
    variables: {
      orchestraId,
      memberId
    }
  });

  return (
    <div>
      <span>this is a private chat</span>
      {data && <span> with {data.memberById.user.name}</span>}
      {error && <span>{error.message}</span>}
      {loading && <span>loading ...</span>}
    </div>
  );
}
