import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "@apollo/react-hooks";
import { userDocument } from "../../../data/documents";

const StyledContainer = styled.div`
  padding: 15px 0 10px 0;
  font-size: 20px;
`;

const StyledTitle = styled.h2`
  font-size: 24px;
`;

const StyledSubtitle = styled.p`
  font-size: 18px;
`;

function Header(orchestra) {
  const { data } = useQuery(userDocument);

  return (
    <StyledContainer>
      {data && <StyledSubtitle>{data.user.nickname}</StyledSubtitle>}
      <StyledTitle>{orchestra.name}</StyledTitle>
    </StyledContainer>
  );
}

export default Header;
