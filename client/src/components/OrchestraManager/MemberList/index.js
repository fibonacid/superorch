import React, { useContext } from "react";
import styled from "styled-components/macro";
import ActivityContext from "../../../context/activity-context";
import ListItem from "./ListItem";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const StyledContainer = styled.div`
  margin: 30px 5px 5px 5px;
`;

const QUERY = gql`
  query($orchestraId: String!) {
    singleOrchestra(orchestraId: $orchestraId) {
      name
      members {
        _id
        user {
          _id
        }
      }
    }
  }
`;

//
// Displays a list of users
//
export default function UserList() {
  const { orchestra: id } = useContext(ActivityContext);

  const { data, loading, error } = useQuery(QUERY, {
    variables: { orchestraId: id }
  });

  return (
    <StyledContainer>
      {loading && <span>Loading ...</span>}
      {error && <Error message={error.message} />}
      <ul>
        {data &&
          data.singleOrchestra.members.map((member, i) => (
            <ListItem key={i} member={member} />
          ))}
      </ul>
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
