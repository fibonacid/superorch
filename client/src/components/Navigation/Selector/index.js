import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useQuery } from "@apollo/react-hooks";
import { orchestraListDocument } from "../../../data/documents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 1 50%;
  margin-top: 15px;
`;

const StyledLink = styled(Link)`
  margin-top: 10px;
  border: none;
  font-size: 25px;
  color: white;
  text-decoration: none;
`;

function OrchestraSelector() {
  const history = useHistory();
  const [index, setIndex] = useState(null);
  const { data } = useQuery(orchestraListDocument);

  const redirect = () => {
    history.push("/orchestras/create");
  };

  return (
    <StyledContainer>
      <ul>
        {data &&
          data.orchestras.map((orchestra, i) => (
            <Item
              key={i}
              orchestra={orchestra}
              onClick={setIndex.bind(null, i)}
              active={i === index}
            />
          ))}
      </ul>
      <FontAwesomeIcon
        onClick={redirect}
        icon={faPlus}
        size="1x"
        style={{ marginTop: "15px", cursor: "pointer" }}
      />
    </StyledContainer>
  );
}

export default OrchestraSelector;
