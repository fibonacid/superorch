import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useMember from "../../../hooks/useMember";
import { privateMessagesDocument, sendPrivateMessageDocument } from "../../../config/documents";
import MessageBoard from "../../../components/MessageBoard";

export default function PrivateChatView({ memberId }) {
  const params = useParams();
  const orchestraId = params.orchestra;

  const member = useMember(orchestraId, memberId);

  const queryOptions = {
    variables: {
      orchestraId,
      memberId
    }
  };

  const { data, loading, error } = useQuery(privateMessagesDocument, queryOptions);

  const [sendPrivateMessage] = useMutation(sendPrivateMessageDocument, {
    refetchQueries: [
      {
        query: privateMessagesDocument,
        ...queryOptions
      }
    ]
  });

  const onSend = useCallback(text => {
    sendPrivateMessage({
      variables: {
        orchestraId,
        memberId,
        format: "PLAIN_TEXT",
        context: "CHAT",
        body: text
      }
    });
  }, []);

  return (
    <>
      {data && (
        <MessageBoard
          title={member && member.user.name || ""}
          messages={data.privateMessages}
          onSend={onSend}
        />
      )}
      {error && <span>{error.message}</span>}
      {loading && <span>loading ...</span>}
    </>
  );
}
