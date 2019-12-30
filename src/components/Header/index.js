import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const StyledWrap = styled.header`
  background: whitesmoke;
  padding: 10px;
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const StyledItem = styled.li`
  & a {
    color: black;
    text-decoration: none;
  }
`;

function Header(props) {

  const context = useContext(AuthContext);

  return (
    <StyledWrap>
      <StyledList>
        <StyledItem>
          <Link to={"/"}>Home</Link>
        </StyledItem>
        {!context.token && <StyledItem>
          <Link to={"/auth"} >Login</Link>
        </StyledItem>}
        {context.token && <StyledItem>
          <a href="#" onClick={context.logout}>Logout</a>
        </StyledItem>}
      </StyledList>
    </StyledWrap>
  )
}

export default Header;
