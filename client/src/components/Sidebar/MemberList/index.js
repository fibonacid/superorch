import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";

const StyledContainer = styled.div`
  margin: 30px 0 5px 0;
  font-size: 14px;
`;

const StyledTitle = styled.h3`
  font-size: 18px;
`;

const StyledList = styled.ul`
  margin-top: 15px;
`;

const StyledLink = styled(Link)`
  color: grey;
  margin-top: 15px;
  text-decoration: none;
`;

//
// Displays a list of users
//
function MemberList({ orchestra }) {
  const userId = localStorage.getItem("userId");

  // Filter out the current user
  const members = orchestra.members.filter(
    member => member.user._id !== userId
  );

  return (
    <StyledContainer>
      <StyledTitle>{`${members.length} Members`}</StyledTitle>

      <StyledList>
        {members.map((m, i) => (
          <ListItem key={i} member={m} />
        ))}
      </StyledList>

      <StyledLink to={`/orchestras/${orchestra._id}/invites`}>
        + invite
      </StyledLink>
    </StyledContainer>
  );
}

export default MemberList;
