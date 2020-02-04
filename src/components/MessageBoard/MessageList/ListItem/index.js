import React from "react";
import styled from "styled-components";
import useMember from "../../../../hooks/useMember";

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
  const from = message.from.user._id;
  const isLoggedUser = from === localStorage.getItem("userId");

  return (
    <StyledContainer right={isLoggedUser}>
      <StyledInner>{message.body}</StyledInner>
    </StyledContainer>
  );
}
