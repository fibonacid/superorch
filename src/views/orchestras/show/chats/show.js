import React, { useEffect, useCallback, useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import useBreakpoint from '../../../../hooks/useBreakpoint';
import { getRequestMap } from "./_map";
import MessageBoard from "../../../../components/MessageBoard";
import Playground from "../../../../components/Playground";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
   padding: 5px 10px;
   background: whitesmoke;
   border-bottom: solid 1px lightgrey;
   font-size: 18px;
   display: flex;
   justify-content: space-between;
   align-items: center;
`;

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 30px;
  cursor: pointer;
  margin-left: 5px;
`;

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
  const [chatVisible, setChatVisible] = useState(false);
  const onChatClick = useCallback(
    () => setChatVisible(!chatVisible),
    [chatVisible]
  );

  const breakpoints = useBreakpoint();
  const editorVisible = breakpoints.sm || !chatVisible;
  
  return (
    <StyledWrapper>
      <StyledHeader>
        <h3>{title}</h3>
        <StyledIcon
          icon={faCommentDots}
          onClick={onChatClick}
          color={chatVisible ? "black" : "lightgrey"}
        />
      </StyledHeader>
      <StyledContainer>
        {editorVisible && <Playground onEvaluate={onEvaluate} />}
        {chatVisible && <MessageBoard messages={messages || []} onSend={onSend} />}
      </StyledContainer>
    </StyledWrapper>
  );
}
