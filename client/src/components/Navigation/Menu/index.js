import React, { useContext } from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context/auth-context";

const StyledLink = styled.a`
  color: white;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  display: block;
  margin-top: 10px;
`;

function Menu() {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    history.push("/login");
  }

  return (
    <div>
      <StyledLink>Invites</StyledLink>
      <StyledLink onClick={handleLogout}>Logout</StyledLink>
    </div>
  );
}

export default Menu;
