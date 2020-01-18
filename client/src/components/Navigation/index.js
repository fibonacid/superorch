import React, { useContext } from "react";
import styled from "styled-components/macro";
import AuthContext from "../../context/auth-context";
import Selector from "./Selector";
import Menu from "./Menu";
import Bottom from "./Bottom";

const StyledWrap = styled.header`
  flex: 0 0 60px;
  background: black;
  padding: 15px 5px;
  border-bottom: solid 1px lightgrey;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

function Navigation() {
  const { token } = useContext(AuthContext);

  return (
    <StyledWrap>
      {token && (
        <>
          <Selector />
          <Menu />
          <Bottom />
        </>
      )}
    </StyledWrap>
  );
}

export default Navigation;
