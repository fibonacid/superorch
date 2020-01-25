import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { orchestraDocument, newMemberDocument } from "../../config/documents";
import Header from "./Header";
import MemberList from "./MemberList";

const StyledContainer = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
  padding: 0 10px;
`;

export default function Sidebar() {
  const { id: orchestraId } = useParams();

  const { subscribeToMore, data, loading, error } = useQuery(
    orchestraDocument,
    {
      variables: { orchestraId },
      skip: !orchestraId
    }
  );

  const subscribeToNewMembers = () =>
    subscribeToMore({
      document: newMemberDocument,
      variables: { orchestraId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const orchestra = prev.orchestraById;
        const { newMember } = subscriptionData.data;

        return {
          orchestraById: {
            ...orchestra,
            members: [...orchestra.members, newMember]
          }
        };
      }
    });

  useEffect(subscribeToNewMembers, []);

  return (
    <StyledContainer>
      {data && data.orchestraById && (
        <>
          <Header orchestra={data.orchestraById} />
          <MemberList orchestra={data.orchestraById} />
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
