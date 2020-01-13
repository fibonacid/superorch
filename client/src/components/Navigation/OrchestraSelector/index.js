import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import SelectorItem from "./SelectorItem";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  border: none;
  font-size: 25px;
  color: white;
  text-decoration: none;
`;

const QUERY = gql`
  query {
    orchestras {
      _id
      name
    }
  }
`;

function OrchestraSelector() {
  const { data } = useQuery(QUERY);

  return (
    <StyledContainer>
      <ul>
        {data &&
          data.orchestras.map((o, i) => <SelectorItem key={i} orchestra={o} />)}
      </ul>
      <StyledLink to="/orchestras/create">+</StyledLink>
    </StyledContainer>
  );
}

export default OrchestraSelector;
