import React, { useCallback, useRef } from "react";
import styled from "styled-components/macro";
import { copyToClipboard } from "../../../../helpers/common";
import useFlashMessages from "../../../../hooks/useFlashMessages";
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";
import Header from "../Header";

const textColor = `rgb(0, 255, 0)`;

const StyledContainer = styled(SpeachBubble)`
  cursor: pointer;
`;

const StyledBody = styled.p`
  font-family: monospace;
  color: ${textColor};
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
  const { dispatch } = useFlashMessages();


  const onClick = useCallback(() => {
    try {
      // Copy text to clipboard
      copyToClipboard(bodyRef.current);
      // Display flash message
      dispatch({
        type: "add",
        message: {
          value: "Copied to clipboard"
        }
      });
    } catch (err) {
      console.error(err);
    }
  }, [bodyRef, dispatch]);

  return (
    <StyledContainer onClick={onClick} direction={direction} color="black">
      <Header username={username} showUsername={showUsername} nameColor={textColor}/>
      <StyledBody ref={bodyRef}>{body}</StyledBody>
    </StyledContainer>
  );
}
