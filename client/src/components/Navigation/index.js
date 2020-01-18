import React, { useContext } from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import Selector from "./Selector";

const StyledWrap = styled.header`
  flex: 0 0 60px;
  background: black;
  padding: 15px 5px;
  border-bottom: solid 1px lightgrey;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const StyledLink = styled.a`
  color: white;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
`;

function Navigation() {
  const history = useHistory();
  const { token, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    history.push("/login");
  }

  return (
    <StyledWrap>
      {token && (
        <>
          <Selector />
          <StyledLink onClick={handleLogout}>Logout</StyledLink>
        </>
      )}
    </StyledWrap>
  );
}

export default Navigation;
