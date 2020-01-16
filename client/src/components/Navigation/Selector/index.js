import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { useQuery } from "@apollo/react-hooks";
import { orchestraListDocument } from "../../../data/documents";
import Item from "./Item";

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

function OrchestraSelector() {
  const { data } = useQuery(orchestraListDocument);

  return (
    <StyledContainer>
      <ul>
        {data &&
          data.orchestras.map((orchestra, i) => (
            <Item key={i} orchestra={orchestra} />
          ))}
      </ul>
      <StyledLink to="/orchestras/create">+</StyledLink>
    </StyledContainer>
  );
}

export default OrchestraSelector;
