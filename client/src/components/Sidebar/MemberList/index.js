import React from "react";
import styled from "styled-components/macro";
import ListItem from "./ListItem";

const StyledContainer = styled.ul`
  margin: 30px 0 5px 0;
  font-size: 14px;
`;

//
// Displays a list of users
//
function MemberList({ members }) {
  const userId = localStorage.getItem("userId");

  // Filter out the current user
  const filtered = members.filter(member => member.user._id !== userId);

  return (
    <StyledContainer>
      <p>{`${filtered.length} Members`}</p>
      {filtered.map((m, i) => (
        <ListItem key={i} member={m} />
      ))}
    </StyledContainer>
  );
}

export default MemberList;
