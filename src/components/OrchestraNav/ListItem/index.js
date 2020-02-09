import React from "react";
import styled from "styled-components/macro";
import { Link, useRouteMatch } from "react-router-dom";

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
    font-weight: ${props => (props.current ? "bold" : "normal")};
  }
`;

function ListItem({ url, children }) {
  const match = useRouteMatch(url);

  return (
    <StyledContainer current={!!match}>
      <Link to={url}>{children}</Link>
    </StyledContainer>
  );
}

export default ListItem;
