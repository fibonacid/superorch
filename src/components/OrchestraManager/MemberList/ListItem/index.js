import React from "react";
import styled from "styled-components/macro";
import {Link} from 'react-router-dom';

const StyledContainer = styled.li`
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px lightgrey;
  a {
    color: black;
    text-decoration: none;
  }
`;

function ListItem({ orchestra, member }) {
  const { user } = member;

  return (
    <StyledContainer>
      <Link
        to={`/orchestras/${orchestra._id}/members/${member._id}`}
      >
        {user.name}
      </Link>
    </StyledContainer>
  );
}

export default ListItem;
