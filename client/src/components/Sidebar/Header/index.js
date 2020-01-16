import React, { useContext } from "react";
import OrchestraContext from "../../../context/orchestra-context";
import styled from "styled-components/macro";

const StyledTitle = styled.h2`
  text-align: center;
  padding: 15px 5px 5px 5px;
  font-size: 20px;
`;

function Header() {
  const { orchestra } = useContext(OrchestraContext);
  return <StyledTitle>{orchestra.name}</StyledTitle>;
}

export default Header;
