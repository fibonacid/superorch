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

export const getMembers = gql`
   query getMembers($orchestraId: String!) {
      members(orchestraId: $orchestraId) {
         ...MemberDetail
      }
   }
   ${MEMBER_DETAIL_FRAGMENT}
`;

export const getMoreMembers = gql`
  subscription($orchestraId: String!) {
    newMember(orchestraId: $orchestraId) {
      ...MemberDetail
    }
  }
  ${MEMBER_DETAIL_FRAGMENT}
`;

export const getMember = gql`
   query getMember($orchestraId: String!, $memberId: String!) {
      member(orchestraId: $orchestraId, memberId: $memberId) {
         ...MemberDetail
      }
   }
   ${MEMBER_DETAIL_FRAGMENT}
`;