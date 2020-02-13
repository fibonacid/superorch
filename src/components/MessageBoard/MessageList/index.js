import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components/macro";
import Message from "../Message";

const StyledContainer = styled.div`
  flex: 1;
  position: relative;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 50px;
`;

export default function MessageList({ messages, fetching, fetchMore }) {
  const containerRef = useRef();
  const [height, setHeight] = useState();

  // If user has scrolled up over a threshold
  // fetch more messages.
  const handleScroll = useCallback(
    event => {
      const { scrollTop } = event.target;
      if (scrollTop < 300 && !fetching) {
        // Save current height
        setHeight(containerRef.current.scrollHeight);
        // Fetch more messages
        fetchMore();
      }
    },
    [fetching, fetchMore, setHeight, containerRef]
  );

  //Save previous amount of messages.
  const prevMessagesRef = useRef([]);
  useEffect(() => {
    prevMessagesRef.current = messages;
  });
  const prevMessages = prevMessagesRef.current;

  useEffect(() => {
    // If new messages were added since the last render
    // calculate the increase of height in the container
    // and use it to set the scroll position.
    if (
      height &&
      prevMessages &&
      containerRef.current &&
      messages.length &&
      messages.length !== prevMessages.length
    ) {
      const lastMessage = messages[messages.length - 1];
      const prevLastMessage = prevMessages[prevMessages.length - 1]

      // If added messages are on the bottom of the list.
      if (lastMessage !== prevLastMessage) {
        // Reset scrollTop of container with difference between
        // previous and current scrollHeight.
        const currentHeight = containerRef.current.scrollHeight;
        containerRef.current.scrollTop = currentHeight - height;
      } else {
        // Else, scroll to the bottom of the container.
        const bottom = containerRef.current.scrollHeight;
        containerRef.current.scroll(0, bottom);
      }
    }
  }, [containerRef, messages, prevMessages, height]);

  useEffect(() => {
    if (containerRef) {
      const bottom = containerRef.current.scrollHeight;
      containerRef.current.scroll(0, bottom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledContainer>
      <StyledInner onScroll={handleScroll} ref={containerRef}>
        <StyledList>
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
        </StyledList>
      </StyledInner>
    </StyledContainer>
  );
}
