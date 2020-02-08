import React, { useContext } from "react";
import styled from "styled-components/macro";
import AuthContext from "../../context/auth-context";
import Inbox from "./Inbox";
import Selector from "./Selector";
import Account from "./Account";

const StyledWrap = styled.header`
  flex: 0 0 60px;
  background: black;
  padding: 15px 5px;
  border-bottom: solid 1px lightgrey;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  color: white;
  font-size: 22px;
  text-align: center;
`;

function MainNav() {
  const { token } = useContext(AuthContext);

  return (
    <StyledWrap>
      {token && (
        <>
          <div>
            <Inbox />
            <Selector />
          </div>
          <Account />
        </>
      )}
    </StyledWrap>
  );
}

export default MainNav;
