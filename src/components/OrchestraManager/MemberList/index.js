import React from "react";
import styled from "styled-components/macro";
import BackgroundLink from '../../_miscellaneous/BackgroundLink';
import ListItem from "./ListItem";

const StyledContainer = styled.div`
  margin: 30px 0 5px 0;
  font-size: 14px;
`;

const StyledList = styled.ul`
  margin: 15px 0;
`;

const StyledLink = styled(BackgroundLink)`
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
      <StyledList>
        {members.map((m, i) => (
          <ListItem key={i} orchestra={orchestra} member={m} />
        ))}
      </StyledList>

      <StyledLink to={`/orchestras/${orchestra._id}/invites`}>
        + invite
      </StyledLink>
    </StyledContainer>
  );
}

export default MemberList;
