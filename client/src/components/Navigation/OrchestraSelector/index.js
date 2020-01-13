import React from "react";
import styled from "styled-components/macro";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import SelectorItem from "./SelectorItem";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  border: none;
  font-size: 25px;
  width: 40px;
  border-radius: 10px;
`;

const ORCHESTRAS_QUERY = gql`
  query {
    orchestras {
      _id
      name
    }
  }
`;

function OrchestraSelector() {
  const { data } = useQuery(ORCHESTRAS_QUERY);

  return (
    <StyledContainer>
      <ul>
        {data &&
          data.orchestras.map((o, i) => <SelectorItem key={i} orchestra={o} />)}
      </ul>
      <StyledButton>+</StyledButton>
    </StyledContainer>
  );
}

export default OrchestraSelector;
