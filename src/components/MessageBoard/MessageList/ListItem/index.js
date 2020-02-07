import React, { useState } from "react";
import styled from "styled-components";
import SpeachBubble from "../../../_miscellaneous/SpeachBubble";

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
        <div>{message.body}</div>
      </SpeachBubble>
    </StyledContainer>
  );
}
