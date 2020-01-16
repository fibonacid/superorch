import React, { useContext } from "react";
import styled from "styled-components/macro";
import Header from "./Header";
import MemberList from "./MemberList";

const StyledContainer = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
`;

export default function Sidebar() {
  return (
    <StyledContainer>
      <Header />
      <MemberList />
    </StyledContainer>
  );
}

const StyledError = styled.span`
  color: red;
`;

//
// Renders eventual errors
//
function Error(props) {
  return <StyledError>{props.message}</StyledError>;
}
