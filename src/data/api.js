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

export const USERS_QUERY = gql`
  query {
    users {
      _id
      nickname
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

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($nickname: String) {
    updateUser(userUpdateInput: { nickname: $nickname }) {
      nickname
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