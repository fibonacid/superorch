import React, { useContext } from "react";
import styled from "styled-components/macro";
import ActivityContext from "../../context/activity-context";
import { useQuery } from "@apollo/react-hooks";
import { orchestraDocument } from "../../data/documents";
import Header from "./Header";
import MemberList from "./MemberList";

const StyledContainer = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
`;

export default function Sidebar() {
  const { orchestra } = useContext(ActivityContext);

  const { loading, data, error } = useQuery(orchestraDocument, {
    variables: { orchestraId: orchestra }
  });

  return (
    <StyledContainer>
      {data && (
        <>
          <Header title={data.singleOrchestra.name} />
          <MemberList members={data.singleOrchestra.members} />
        </>
      )}
      {loading && <span>Loading ...</span>}
      {error && <Error>{error}</Error>}
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
