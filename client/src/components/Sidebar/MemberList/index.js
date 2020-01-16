import React, { useContext } from "react";
import OrchestraContext from "../../../context/orchestra-context";
import styled from "styled-components/macro";
import ListItem from "./ListItem";

const StyledContainer = styled.ul`
  margin: 30px 5px 5px 5px;
`;

//
// Displays a list of users
//
export default function MemberList() {
  const { orchestra } = useContext(OrchestraContext);

  return (
    <StyledContainer>
      {orchestra.members.map((member, i) => (
        <ListItem key={i} member={member} />
      ))}
    </StyledContainer>
  );
}
