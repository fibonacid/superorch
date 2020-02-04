import React, {useState} from "react";
import styled from "styled-components";

const StyledContainer = styled.li`
  margin: 5px;
  display: flex;
  flex-direction: ${props => (props.right ? "row-reverse" : "row")};
`;

const StyledInner = styled.div`
  display: inline;
  background: white;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
`;

export default function ListItem({ message }) {
  const [userId] = useState(localStorage.getItem("userId"))
  const isLoggedUser = message.from.user._id === userId;

  return (
    <StyledContainer right={isLoggedUser}>
      <StyledInner>{message.body}</StyledInner>
    </StyledContainer>
  );
}
