import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.li`
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px lightgrey;
`;

function ListItem({ member }) {
  const { user } = member;

  return (
    <StyledContainer>
      <span>{user.name}</span>
    </StyledContainer>
  );
}

export default ListItem;
