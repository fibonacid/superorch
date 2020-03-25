import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: block;
  padding: 10px;
  border-bottom: solid 1px lightgrey;
`;

export default function AccountNav() {
  return (
    <ul>
      <li>
        <StyledLink to={"/account/profile"}>User profile</StyledLink>
      </li>
      <li>
        <StyledLink to={"/account/security"}>Security</StyledLink>
      </li>
    </ul>
  );
}
