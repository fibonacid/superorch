import React, { useContext } from "react";
import styled from "styled-components/macro";
import AuthContext from "../../context/auth-context";
import useLogout from "../../hooks/useLogout";
import Inbox from "./Inbox";
import Selector from "./Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

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

function Navigation() {
  const { token } = useContext(AuthContext);
  const logout = useLogout();

  return (
    <StyledWrap>
      {token && (
        <>
          <div>
            <Inbox />
            <Selector />
          </div>
          <div>
            <FontAwesomeIcon
              onClick={logout}
              icon={faSignOutAlt}
              style={{ cursor: "pointer" }}
            />
          </div>
        </>
      )}
    </StyledWrap>
  );
}

export default Navigation;
