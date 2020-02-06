import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { GET_ORCHESTRA_QUERY } from '../../api/orchestras';
import { getMoreMembers } from "../../api/members";
import Header from "./Header";
import ChannelList from "./ChannelList";
import MemberList from "./MemberList";

const StyledContainer = styled.div`
  padding: 10px;
  a {
    color: black;
    text-decoration: none;
  }
`;

export default function OrchestraManager() {
  const params = useParams();
  const orchestraId = params.orchestra;

  const { data, loading, error } = useQuery(GET_ORCHESTRA_QUERY,
    {
      variables: { orchestraId },
      skip: !orchestraId
    }
  );

  // const subscribeToNewMembers = () =>
  //   subscribeToMore({
  //     document: getMoreMembers,
  //     variables: { orchestraId },
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData) return prev;
  //       const orchestra = prev.orchestra;
  //       const { newMember } = subscriptionData.data;

  //       return {
  //         orchestra: {
  //           ...orchestra,
  //           members: [...orchestra.members, newMember]
  //         }
  //       };
  //     }
  //   });

  // useEffect(subscribeToNewMembers, []);

  return (
    <StyledContainer>
      {data && data.orchestra && (
        <>
          <Header orchestra={data.orchestra} />
          <ChannelList orchestra={data.orchestra} />
          <MemberList orchestra={data.orchestra} />
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
