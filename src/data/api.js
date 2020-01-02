import { gql } from 'apollo-boost';

// 
// Queries
//
export const LOGIN_QUERY = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration 
    }
  }
`;

//
// Mutations
//
export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
    }
  }
`;

//
// Subscriptions
//
export const USER_JOINED_SUBSCRIPTION = gql`
  subscription {
    userJoined {
      _id
      email
    }
  }
`;