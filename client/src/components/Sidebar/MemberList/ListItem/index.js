import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.li`
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px lightgrey;
`;

function ListItem({ member }) {
  return (
    <StyledContainer>
      <span>{member._id}</span>
    </StyledContainer>
  );
}

export default ListItem;
