import React, { useState, useCallback, useRef } from "react";
import styled from "styled-components/macro";
import { copyToClipboard } from "../../../../helpers/common";
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";
import Portal from "../../../_miscellaneous/Portal";
import Flash from "../../../_miscellaneous/Flash";
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
  const [copied, setCopied] = useState(false);

  // Copy text to clipboard
  const onClick = useCallback(() => {
    try {
      copyToClipboard(bodyRef.current);
      setCopied(true);
    } catch(err) {
      console.error(err);
    }
  }, [bodyRef, setCopied]);

  return (
    <StyledContainer onClick={onClick} direction={direction} color="black">
      <Header username={username} showUsername={showUsername} />
      <StyledBody ref={bodyRef}>{body}</StyledBody>
      {copied && (
        <Portal id="modal-root">
          <Flash>Copied to clipboard</Flash>
        </Portal>
      )}
    </StyledContainer>
  );
}
