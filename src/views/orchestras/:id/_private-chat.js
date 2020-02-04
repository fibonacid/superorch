import React from "react";
import { useParams } from "react-router-dom";
// import { useQuery } from "@apollo/react-hooks";
import useMember from '../../../hooks/useMember';
// import { memberByIdDocument } from "../../../config/documents";

export default function PrivateChatView({ memberId }) {
  const params = useParams();
  const orchestraId = params.id;

  const member = useMember(orchestraId, memberId);

  return (
    <div>
      <span>this is a private chat</span>
      {member && <span> with {member.user.name}</span>}
      {/* {error && <span>{error.message}</span>}
      {loading && <span>loading ...</span>} */}
    </div>
  );
}
