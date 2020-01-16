import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import OrchestraContext from "../../../context/orchestra-context";
import { useQuery } from "@apollo/react-hooks";
import { orchestraListDocument } from "../../../data/documents";
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

function OrchestraSelector() {
  const { orchestra: current } = useContext(OrchestraContext);
  const { data } = useQuery(orchestraListDocument);

  return (
    <StyledContainer>
      <ul>
        {data &&
          data.orchestras.map((o, i) => (
            <SelectorItem key={i} orchestra={o} currentId={current._id} />
          ))}
      </ul>
      <StyledLink to="/orchestras/create">+</StyledLink>
    </StyledContainer>
  );
}

export default OrchestraSelector;
