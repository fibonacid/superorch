import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  flex: 0 1 200px;
  border-right: solid 1px lightgrey;
  color: whitesmoke;
`;

export default function Sidebar(props) {
  return <StyledContainer>{props.children}</StyledContainer>;
}
