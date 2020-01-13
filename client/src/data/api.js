import { gql } from "apollo-boost";

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

export const ORCHESTRAS_QUERY = gql`
  query {
    orchestras {
      _id
      name
      members {
        _id
      }
    }
  }
`;

export const SINGLE_ORCHESTRA_QUERY = gql`
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
// Mutations
//
export const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($nickname: String) {
    updateUser(userInput: { nickname: $nickname }) {
      nickname
    }
  }
`;

export const CREATE_ORCHESTRA_MUTATION = gql`
  mutation createOrchestra($name: String!) {
    createOrchestra(name: $name) {
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
