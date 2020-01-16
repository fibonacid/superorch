import React, { useContext, useEffect } from "react";
import styled from "styled-components/macro";
import SelectionContext from "../../context/selection-context";
import { useLazyQuery } from "@apollo/react-hooks";
import { orchestraDocument } from "../../data/documents";
import Header from "./Header";
import MemberList from "./MemberList";

const StyledContainer = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
`;

export default function Sidebar() {
  const { orchestra: selection } = useContext(SelectionContext);
  const [fetchOrchestra, { data }] = useLazyQuery(orchestraDocument);

  const orchestraId = selection.id;

  useEffect(
    function() {
      // Fetch selected orchestra
      fetchOrchestra({ variables: { orchestraId } });
    },
    [orchestraId]
  );

  return (
    <StyledContainer>
      {data && (
        <>
          <Header name={data.orchestraById.name} />
          <MemberList members={data.orchestraById.members} />
        </>
      )}
    </StyledContainer>
  );
}

const StyledError = styled.span`
  color: red;
`;

//
// Renders eventual errors
//
function Error(props) {
  return <StyledError>{props.message}</StyledError>;
}
