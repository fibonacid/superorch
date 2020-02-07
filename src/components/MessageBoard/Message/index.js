import React, { useState } from "react";
import styled from "styled-components";
import SpeachBubble from "../../_miscellaneous/SpeachBubble";

const StyledContainer = styled.li`
  margin: 5px 20px;
  display: flex;
  flex-direction: ${props => (props.right ? "row-reverse" : "row")};
  font-size: 14px;
`;

const StyledUsername = styled.p`
  color: blue;
  font-size: 13px;
  margin-bottom: 5px;
`;

const StyledSC = styled.p`
   font-family: monospace;
   color: grey;
   font-size: 13px;
   text-overflow: ellipsis;
`;

export default function ListItem({ message }) {
  const [userId] = useState(localStorage.getItem("userId"));
  const isLoggedUser = message.from.user._id === userId;

  const username = message?.from?.user?.name;
  const isPrivate = message.__typename === "PrivateMessage";
  const showUsername = !isLoggedUser && !isPrivate;

  return (
    <StyledContainer right={isLoggedUser}>
      <SpeachBubble right={isLoggedUser}>
        {showUsername && <StyledUsername>{username}</StyledUsername>}
        {renderBody(message.format, message.body)}
      </SpeachBubble>
    </StyledContainer>
  );
}

function renderBody(format, body) {
  switch(format) {
    case "SC_RAW":
    case "SC_LANG":
      return <StyledSC>{body}</StyledSC>
    default:
      return <p>{body}</p>
  }
}
