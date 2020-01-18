import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  background: rgba(0, 0, 0, 0.9);
  color: white;
`;

function Console(props) {
  return <StyledContainer className={props.className}></StyledContainer>;
}

export default Console;
