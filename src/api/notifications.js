import { gql } from 'apollo-boost';

export const GET_NOTIFICATIONS_QUERY = gql`
  query getNotifications {
    invites {
      _id
    }
  }
  # add other queries that qualify as notification
`;