import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.li`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px lightgrey;
`;

function ListItem({ member }) {
  const { user } = member;

  return (
    <StyledContainer>
      <span>{user.nickname}</span>
    </StyledContainer>
  );
}

export default ListItem;
