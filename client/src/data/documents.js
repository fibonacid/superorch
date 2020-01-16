import { gql } from "apollo-boost";

//
// Queries
//
export const loginDocument = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

export const userListDocument = gql`
  query {
    users {
      _id
      nickname
    }
  }
`;

export const userDocument = gql`
  query {
    user {
      _id
      nickname
      email
    }
  }
`;

export const orchestraListDocument = gql`
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

export const orchestraDocument = gql`
  query($orchestraId: String!) {
    singleOrchestra(orchestraId: $orchestraId) {
      _id
      name
      members {
        user {
          _id
          nickname
        }
      }
    }
  }
`;

//
// Mutations
//
export const registerDocument = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

export const updateUserDocument = gql`
  mutation updateUser($nickname: String) {
    updateUser(userInput: { nickname: $nickname }) {
      nickname
    }
  }
`;

export const createOrchestraDocument = gql`
  mutation createOrchestra($name: String!) {
    createOrchestra(name: $name) {
      _id
    }
  }
`;

//
// Subscriptions
//
export const userJoinedDocument = gql`
  subscription {
    userJoined {
      _id
      email
    }
  }
`;
