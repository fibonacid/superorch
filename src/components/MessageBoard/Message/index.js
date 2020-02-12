import React, { useState } from "react";
import styled from "styled-components";
import PlainText from "./PlainText";
import SCLang from "./SCLang";

const StyledContainer = styled.li`
  margin: 5px 20px;
  display: flex;
  flex-direction: ${props => props.direction === "right" && "row-reverse"};
  font-size: 14px;
`;

export default function Message({ message }) {
  const [userId] = useState(localStorage.getItem("userId"));
  const isMe = message.from.user._id === userId;

  const username = message?.from?.user?.name;
  const isPrivate = message.__typename === "PrivateMessage";
  const showName = !isMe && !isPrivate;

  const direction = isMe ? "right" : "left";
  const { format, body } = message;

  let Component;
  if (format === "SC_LANG" || format === "SC_RAW") {
    Component = SCLang;
  } else {
    Component = PlainText;
  }

  return (
    <StyledContainer direction={direction}>
      <Component
        direction={direction}
        username={username}
        showUsername={showName}
        body={body}
      />
    </StyledContainer>
  );
}
