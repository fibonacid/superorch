import React from "react";
import styled from "styled-components/macro";

const StyledLink = styled.a`
  color: white;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  display: block;
  margin-top: 10px;
`;

function Menu() {
  return (
    <div>
      <StyledLink>Invites</StyledLink>
    </div>
  );
}

export default Menu;
