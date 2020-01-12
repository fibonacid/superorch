import React, { useEffect } from "react";
import styled from "styled-components/macro";
import Icon from "./Icon";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const StyledPlusIcon = styled(Icon)`
  margin-top: 10px;
  border: none;
  font-size: 25px;
`;

const ORCHESTRAS_QUERY = gql`
  query {
    orchestras {
      _id
    }
  }
`;

export default function MyOrchestras() {
  const { data } = useQuery(ORCHESTRAS_QUERY);

  useEffect(() => {
    if (data) {
      console.log("MyOrchestras", data);
    }
  }, [data]);

  return (
    <div>
      <ul>
        {data && data.orchestras.map((_, i) => <Icon key={i} letter={i + 1} />)}
      </ul>
      <StyledPlusIcon letter="+" />
    </div>
  );
}
