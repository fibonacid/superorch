import React, { useCallback } from "react";
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_CHANNEL_QUERY } from "../../../../api/channels";
import useChannelMessages from "../../../../hooks/useChannelMessages";
import * as ChatLayout from "../../../../components/_layouts/ChatLayout";
import MessageBoard from "../../../../components/MessageBoard";
import Playground from "../../../../components/Playground";

export default function OrchestraChannelShowView() {
  const { orchestra: orchestraId, channel: channelId } = useParams();
  const [messages, sendMessages] = useChannelMessages(orchestraId, channelId, ["CHAT"]);

  const { data } = useQuery(GET_CHANNEL_QUERY, {
    variables: {
      orchestraId,
      channelId
    }
  });

  const onSend = useCallback(text => {
    sendMessages({
      variables: {
        orchestraId,
        channelId,
        format: "PLAIN_TEXT",
        context: "CHAT",
        body: text
      }
    });
  }, []);

  const onEvaluate = useCallback(text => {
    sendMessages({
      variables: {
        orchestraId,
        channelId,
        format: "SC_LANG",
        context: "SUPERCOLLIDER",
        body: text
      }
    });
  }, []);

  return (
    <ChatLayout.Wrapper>
      <ChatLayout.Header>{data?.channel?.name}</ChatLayout.Header>
      <ChatLayout.Container>
        <Playground onEvaluate={onEvaluate}/>
        <MessageBoard messages={messages} onSend={onSend} />
      </ChatLayout.Container>
    </ChatLayout.Wrapper>
  );
}
