import React, { useEffect, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { getRequestMap } from "./_map";
import * as ChatLayout from "../../../../components/_layouts/ChatLayout";
import MessageBoard from "../../../../components/MessageBoard";
import Playground from "../../../../components/Playground";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

export default function OrchestraChatShowView() {
  const { orchestra: orchestraId, chat } = useParams();
  const [targetType, targetId] = chat.split("-");

  const {
    getTitle,
    getMessages,
    getTargetQuery,
    getMessagesQuery,
    sendMessageMutation,
    newMessageSubscription
  } = getRequestMap(orchestraId, targetId, targetType);

  // Get general data about the target of the chat.
  const { data: targetData } = useQuery(
    getTargetQuery.document,
    getTargetQuery.options
  );

  // Get messages relative to this chat target.
  const { subscribeToMore, data: messagesData } = useQuery(
    getMessagesQuery.document,
    getMessagesQuery.options
  );

  // Submit a subscription to receive more messages
  const subscribeToNewMessages = useCallback(() =>
    subscribeToMore(newMessageSubscription)
  );
  useEffect(subscribeToNewMessages, []);

  // Get function to send a new message
  const [sendMessage] = useMutation(
    sendMessageMutation.document,
    sendMessageMutation.options
  );

  // This callback gets execute when a user
  // wants to share a simple message through
  // the MessageBoard component's interface.
  const onSend = useCallback(text => {
    sendMessage({
      variables: {
        ...sendMessageMutation.variables,
        format: "PLAIN_TEXT",
        context: "CHAT",
        body: text
      }
    });
  }, []);

  // This callback gets execute when a user
  // wants to share a piece of supercollider
  // code through the CodeEditor component's intreface.
  const onEvaluate = useCallback(text => {
    sendMessage({
      variables: {
        ...sendMessageMutation.variables,
        format: "SC_LANG",
        context: "SUPERCOLLIDER",
        body: text
      }
    });
  }, []);

  // Parse data to be displayed
  const title = getTitle(targetData);
  const messages = getMessages(messagesData);

  // Toggle visibility of message board
  const [chatVisible, setChatVisible] = useState(true);
  const onChatClick = useCallback(
    () => setChatVisible(!chatVisible),
    [chatVisible]
  );
  
  return (
    <ChatLayout.Wrapper>
      <ChatLayout.Header>
        <h3>{title}</h3>
        <ChatLayout.Icon
          icon={faCommentDots}
          onClick={onChatClick}
          color={chatVisible ? "black" : "lightgrey"}
        />
      </ChatLayout.Header>
      <ChatLayout.Container>
        <Playground onEvaluate={onEvaluate} />
        {chatVisible && <MessageBoard messages={messages || []} onSend={onSend} />}
      </ChatLayout.Container>
    </ChatLayout.Wrapper>
  );
}
