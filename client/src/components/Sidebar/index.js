import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { orchestraDocument } from "../../data/documents";
import Header from "./Header";
import MemberList from "./MemberList";
import Bottom from "./Bottom";

const StyledContainer = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default function Sidebar() {
  const { id: orchestraId } = useParams();

  const { data, loading, error } = useQuery(orchestraDocument, {
    variables: { orchestraId },
    skip: !orchestraId
  });

  return (
    <StyledContainer>
      {data && (
        <>
          <div>
            <Header name={data.orchestraById.name} />
            <MemberList members={data.orchestraById.members} />
          </div>
          <Bottom orchestraId={data.orchestraById._id} />
        </>
      )}
      {loading && <span>Loading ...</span>}
      {error && <span>{error.message}</span>}
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
