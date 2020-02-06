import { gql } from "apollo-boost";

export const GET_INVITES_QUERY = gql`
  query getInvites {
    invites {
      _id
      subject {
        _id
        name
      }
      from {
        name
      }
      createdAt
    }
  }
`;

export const NEW_INVITE_SUBSCRIPTION = gql`
  subscription {
    newInvite {
      _id
      subject {
        _id
        name
      }
      from {
        name
      }
      createdAt
    }
  }
`;

export const SEND_INVITE_MUTATION = gql`
  mutation sendInvite($orchestraId: String!, $email: String!) {
    sendInvite(orchestraId: $orchestraId, email: $email) {
      _id
      pending
      createdAt
    }
  }
`;

export const ACCEPT_INVITE_MUTATION = gql`
  mutation acceptInvite($inviteId: String!) {
    acceptInvite(inviteId: $inviteId) {
      _id
    }
  }
`;

export const DENY_INVITE_MUTATION = gql`
  mutation denyInvite($inviteId: String!) {
    denyInvite(inviteId: $inviteId) {
      _id
    }
  }
`;