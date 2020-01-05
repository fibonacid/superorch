import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const StyledWrap = styled.header`
  flex: 0 0 60px;
  background: black;
  padding: 10px;
  border-bottom: solid 1px lightgrey;
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
`;

const StyledButton = styled.button`
  font-size: 15px;
`;

function Header() {

  const history = useHistory();
  const { token, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    history.push('/login');
  }

  return (
    <StyledWrap>
      {token && <StyledButton onClick={handleLogout}>Logout</StyledButton>}
    </StyledWrap>
  )
}

export default Header;
