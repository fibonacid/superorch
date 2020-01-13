import React from "react";
import styled from "styled-components/macro";

const StyledTitle = styled.h2`
  text-align: center;
  padding: 15px 5px 5px 5px;
  font-size: 20px;
`;

function Header(props) {
  return <StyledTitle>Orchestra Manager</StyledTitle>;
}

export default Header;
