import React from "react";
import styled from "styled-components/macro";
import { Link, useHistory } from "react-router-dom";

const StyledContainer = styled.li`
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px lightgrey;
  a {
    color: black;
    text-decoration: none;
    font-weight: ${props => (props.current ? "bold" : "normal")};
  }
`;

function ListItem({ orchestra, member }) {
  const { location } = useHistory();
  const { user } = member;

  const base = `/orchestras/${orchestra._id}/chats`;
  const slug = `member-${member._id}`;
  const url = base + "/" + slug;

  const match = location?.pathname?.includes(slug);

  return (
    <StyledContainer current={match}>
      <Link to={url}>{user.name}</Link>
    </StyledContainer>
  );
}

export default ListItem;
