import React, { useCallback, useRef } from "react";
import styled from "styled-components/macro";
import { copyToClipboard } from "../../../../helpers/common";
import useFlashMessages from '../../../../hooks/useFlashMessages';
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";
import Header from "../Header";

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
  const { addMessage } = useFlashMessages();

  // Copy text to clipboard
  const onClick = useCallback(() => {
    try {
      copyToClipboard(bodyRef.current);
      addMessage("Copied to clipboard")
    } catch(err) {
      console.error(err);
    }
  }, [bodyRef, addMessage]);

  return (
    <StyledContainer onClick={onClick} direction={direction} color="black">
      <Header username={username} showUsername={showUsername} />
      <StyledBody ref={bodyRef}>{body}</StyledBody>
    </StyledContainer>
  );
}
