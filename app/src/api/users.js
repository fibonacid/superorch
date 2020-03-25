import { gql } from "apollo-boost";

export const USER_DETAIL_FRAGMENT = gql`
  fragment UserDetail on User {
    _id
    __typename
    name
  }
`;

export const USER_PROFILE_FRAGMENT = gql`
  fragment UserProfile on User {
    firstName
    lastName
    city
    birthdate
    bio
  }
`;

export const GET_USER_QUERY = gql`
  query getUser {
    user {
      ...UserDetail
      ...UserProfile
    }
  }
  ${USER_DETAIL_FRAGMENT}
  ${USER_PROFILE_FRAGMENT}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($userInput: UserInput!) {
    updateUser(userInput: $userInput) {
      ...UserDetail
      ...UserProfile
    }
  }
  ${USER_DETAIL_FRAGMENT}
  ${USER_PROFILE_FRAGMENT}
`;
