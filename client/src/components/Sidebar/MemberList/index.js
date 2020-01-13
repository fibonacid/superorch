import React, { useEffect } from "react";
import styled from "styled-components/";
import ListItem from "./ListItem";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

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
  const { data, loading, error } = useQuery(QUERY, {
    variables: { orchestraId: "5e1c9c834a14b807e8e746fd" }
  });

  return (
    <>
      {loading && <span>Loading ...</span>}
      {error && <Error message={error.message} />}
      <ul>
        {data &&
          data.singleOrchestra.members.map((member, i) => (
            <ListItem key={i} member={member} />
          ))}
      </ul>
    </>
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
