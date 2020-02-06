import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useQuery } from "@apollo/react-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Item from "./Item";
import { getOrchestras } from "../../../api/orchestras";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 1 50%;
  margin-top: 15px;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-top: 15px;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

function OrchestraSelector() {
  const history = useHistory();
  const [index, setIndex] = useState(null);
  const { data } = useQuery(getOrchestras);

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
      <StyledIcon onClick={redirect} icon={faPlus} />
    </StyledContainer>
  );
}

export default OrchestraSelector;
