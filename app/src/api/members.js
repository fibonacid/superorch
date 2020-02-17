import { gql } from "apollo-boost";
import {USER_DETAIL_FRAGMENT} from "./users";

export const MEMBER_DETAIL_FRAGMENT = gql`
   fragment MemberDetail on Member {
      _id
      __typename
      user {
         ...UserDetail
      }
   }
   ${USER_DETAIL_FRAGMENT}
`;

export const GET_MEMBERS_QUERY = gql`
   query getMembers($orchestraId: String!) {
      members(orchestraId: $orchestraId) {
         ...MemberDetail
      }
   }
   ${MEMBER_DETAIL_FRAGMENT}
`;

export const NEW_MEMBER_SUBSCRIPTION = gql`
  subscription($orchestraId: String!) {
    newMember(orchestraId: $orchestraId) {
      ...MemberDetail
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

export const GET_MEMBER_QUERY = gql`
   query getMember($orchestraId: String!, $memberId: String!) {
      member(orchestraId: $orchestraId, memberId: $memberId) {
         ...MemberDetail
      }
   }
   ${MEMBER_DETAIL_FRAGMENT}
`;