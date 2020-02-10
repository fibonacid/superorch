import React from "react";
import styled from 'styled-components/macro';
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";
import Header from '../Header';

const StyledBody = styled.p`
  font-family: monospace;
  color: rgb(0,255,0);
  font-size: 12px;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export default function PlainText({
  direction = "right",
  children,
  username,
  showUsername = false
}) {
  return (
    <SpeachBubble direction={direction} color="black">
      <Header username={username} showUsername={showUsername} />
      <StyledBody>{children}</StyledBody>
    </SpeachBubble>
  );
}
