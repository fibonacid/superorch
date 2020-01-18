import React, { useContext } from "react";
import styled from "styled-components/macro";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../../context/auth-context";

const StyledContainer = styled.div`
  &,
  span,
  a {
    color: white;
    text-decoration: none;
    cursor: pointer;
    text-align: center;
    display: block;
    margin-top: 10px;
  }
`;

function Menu() {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
    history.push("/login");
  }

  return (
    <StyledContainer>
      <BackgroundLink to="/invites">Invites</BackgroundLink>
      <span onClick={handleLogout}>Logout</span>
    </StyledContainer>
  );
}

export default Menu;

function BackgroundLink(props) {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: props.to,
        // This is the trick! This link sets
        // the `background` in location state.
        state: { background: location }
      }}
    >
      {props.children}
    </Link>
  );
}
