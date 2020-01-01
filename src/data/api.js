import { gql } from 'apollo-boost';

// 
// GraphQL Queries
//
export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration 
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(userInput: { email: $email, password: $password }) {
      _id
    }
  }
`;