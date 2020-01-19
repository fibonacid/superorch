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
      name
    }
  }
`;

export const userDocument = gql`
  query {
    user {
      _id
      name
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
    orchestraById(orchestraId: $orchestraId) {
      _id
      name
      members {
        user {
          _id
          name
        }
      }
    }
  }
`;

//
// Mutations
//
export const registerDocument = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      token
      userId
      tokenExpiration
    }
  }
`;

export const updateUserDocument = gql`
  mutation updateUser($userInput: UserInput!) {
    updateUser(userInput: $userInput) {
      name
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

export const updateOrchestraDocument = gql`
  mutation updateOrchestra($orchestraId: String!, $name: String) {
    updateOrchestra(
      orchestraId: $orchestraId
      orchestraInput: { name: $name }
    ) {
      _id
      name
    }
  }
`;

export const sendInviteDocument = gql`
  mutation sendInvite($orchestraId: String!, $email: String!) {
    sendInvite(orchestraId: $orchestraId, email: $email) {
      _id
      pending
      createdAt
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
