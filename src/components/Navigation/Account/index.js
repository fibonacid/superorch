import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import useLogout from "../../../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledItem = styled.div`
  cursor: pointer;
  margin-top: 15px;
`;

export default function Account() {
  const history = useHistory();
  const logout = useLogout();

  const account = () => {
    history.push("/account");
  };

  return (
    <StyledList>
      <StyledItem>
        <FontAwesomeIcon onClick={account} icon={faCog} />
      </StyledItem>
      <StyledItem>
        <FontAwesomeIcon onClick={logout} icon={faSignOutAlt} />
      </StyledItem>
    </StyledList>
  );
}
