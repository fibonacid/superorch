import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

const StyledContainer = styled.li`
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  &:not(:last-of-type) {
     border-bottom: solid 1px lightgrey;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

function ListItem({ url, children }) {
  return (
    <StyledContainer>
      <NavLink to={url} activeStyle={{ fontWeight: "bold" }}>{children}</NavLink>
    </StyledContainer>
  );
}

export default ListItem;
