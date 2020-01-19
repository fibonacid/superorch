import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: grey;
  font-size: 14px;
  margin-top: 10px;
  padding: 15px 0;
  text-decoration: none;
`;

function Bottom(props) {
  return (
    <StyledLink to={`/orchestras/${props.orchestraId}/invites`}>
      Invite new member
    </StyledLink>
  );
}

export default Bottom;
