import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const StyledWrap = styled.header`
  background: black;
  padding: 10px;
  border-bottom: solid 1px lightgrey;
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;
`;

const StyledItem = styled.li`
  & a {
    color: white;
    text-decoration: none;
  }
`;

function Header(props) {

  const { token } = useContext(AuthContext);

  return (
    <StyledWrap>
      <StyledList>
        <StyledItem>
          <Link to={"/"}>Home</Link>
        </StyledItem>
        {!token && (<>
          <StyledItem>
            <Link to={"/login"} >Login</Link>
          </StyledItem>
        </>)}
        {token && <StyledItem>
          <a href="#" onClick={context.logout}>Logout</a>
        </StyledItem>}
      </StyledList>
    </StyledWrap>
  )
}

export default Header;
