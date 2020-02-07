import React, { useState } from "react";
import styled, {css} from "styled-components";
import SpeachBubble from "../../_miscellaneous/SpeachBubble";

const StyledContainer = styled.li`
  margin: 5px 20px;
  display: flex;
  flex-direction: ${props => props.direction === "right" && "row-reverse"};
  font-size: 14px;
`;

const StyledUsername = styled.p`
  color: blue;
  font-size: 13px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledSCBody = styled.p`
  font-family: monospace;
  color: rgb(0,255,0);
  font-size: 12px;
  text-overflow: ellipsis;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
`;

export default function ListItem({ message }) {
  const [userId] = useState(localStorage.getItem("userId"));
  const isMe = message.from.user._id === userId;

  const username = message?.from?.user?.name;
  const isPrivate = message.__typename === "PrivateMessage";
  const showName = !isMe && !isPrivate;

  const direction = isMe ? "right" : "left";
  const { format, body } = message;
  const background = format === "SC_RAW" || format === "SC_LANG" ? "black" : "white";

  return (
    <StyledContainer direction={direction}>
      <SpeachBubble direction={direction} color={background}>
        {showName && <StyledUsername>{username}</StyledUsername>}
        {renderBody(format, body)}
      </SpeachBubble>
    </StyledContainer>
  );
}

function renderBody(format, body) {
  switch (format) {
    case "SC_RAW":
    case "SC_LANG":
      return <StyledSCBody>{body}</StyledSCBody>;
    default:
      return <p>{body}</p>;
  }
}
