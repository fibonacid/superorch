import React from "react";
import styled from "styled-components/macro";

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 15px 10px;
  flex-direction: column;
`;

function SecondaryLayout(props) {
  return <StyledContainer>{props.children}</StyledContainer>;
}

export default SecondaryLayout;
