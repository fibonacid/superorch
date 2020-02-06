import { gql } from 'apollo-boost';

export const UserDetail = gql`
   fragment UserDetail on User {
      _id
      __typename
      name
   }
`;

export const UserProfile = gql`
   fragment UserProfile on User {
      firstName
      lastName
      city
      birthdate
      bio
   }
`

export const getUser = gql`
   query getUser {
      user {
         ...UserDetail
         ...UserProfile
      }
   }
   ${UserDetail}
   ${UserProfile}
`;

export const updateUser = gql`
  mutation updateUser($userInput: UserInput!) {
    updateUser(userInput: $userInput) {
      ...UserDetail
      ...UserProfile
    }
  }
  ${UserDetail}
  ${UserProfile}
`;