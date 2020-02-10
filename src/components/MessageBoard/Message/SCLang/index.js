import React, { useCallback } from "react";
import styled from "styled-components/macro";
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";
import Header from "../Header";
import { copyToClipboard } from "../../../../helpers/electron";

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

  // Copy text to clipboard
  // Note: this will only work on electron.
  const onClick = useCallback(() => {
    const { clipboard } = window.require("electron");
    clipboard.writeText(body);

    if(clipboard.readText() === body) {
      alert('Copied to clipboard')
    }
  }, [body]);

  return (
    <StyledContainer onClick={onClick} direction={direction} color="black">
      <Header username={username} showUsername={showUsername} />
      <StyledBody>{body}</StyledBody>
    </StyledContainer>
  );
}
