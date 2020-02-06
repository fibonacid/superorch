import React, { useCallback } from "react";
import styled from 'styled-components/macro';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_CHANNEL_QUERY } from "../../../../api/channels";
import useChannelMessages from "../../../../hooks/useChannelMessages";
import * as ChatLayout from "../../../../components/_layouts/ChatLayout";
import MessageBoard from "../../../../components/MessageBoard";
import Playground from "../../../../components/Playground";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

export default function OrchestraChannelShowView() {
  const { orchestra: orchestraId, channel: channelId } = useParams();
  const [messages, sendMessages] = useChannelMessages(orchestraId, channelId);

  const { data: channel } = useQuery(GET_CHANNEL_QUERY, {
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

  if (!messages || !channel) {
    return <div>... loading</div>;
  }

  return (
    <ChatLayout.Wrapper>
      <ChatLayout.Header>{channel?.name || 'Channel'}</ChatLayout.Header>
      <ChatLayout.Container>
        <Playground />
        <MessageBoard messages={messages} onSend={onSend} />
      </ChatLayout.Container>
    </ChatLayout.Wrapper>
  );
}
