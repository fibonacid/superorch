import React, { useCallback, useRef } from "react";
import styled from "styled-components/macro";
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";
import Header from "../Header";
import { copyToClipboard } from "../../../../helpers/common";

const StyledContainer = styled(SpeachBubble)`
  cursor: pointer;
`;

const StyledBody = styled.p`
  font-family: monospace;
  color: rgb(0, 255, 0);
  font-size: 12px;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export default function SCLang({
  direction = "right",
  body,
  username,
  showUsername = false
}) {
  const bodyRef = useRef();

  // Copy text to clipboard
  const onClick = useCallback(() => {
    try {
      copyToClipboard(bodyRef.current);
      alert('Copied to clipboard')
    } catch(err) {
      console.error(err);
    }
  }, [bodyRef]);

  return (
    <StyledContainer onClick={onClick} direction={direction} color="black">
      <Header username={username} showUsername={showUsername} />
      <StyledBody ref={bodyRef}>{body}</StyledBody>
    </StyledContainer>
  );
}
