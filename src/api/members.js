import { gql } from "apollo-boost";
import {UserDetail, UserProfile} from "./users";

export const MemberDetail = gql`
   fragment MemberDetail on Member {
      _id
      __typename
      user {
         ...UserDetail
      }
   }
   ${UserDetail}
`;

export const getMembers = gql`
   query getMembers($orchestraId: String!) {
      members(orchestraId: $orchestraId) {
         ...MemberDetail
      }
   }
   ${MemberDetail}
`;

export const getMember = gql`
   query getMember($orchestraId: String!, $memberId: String!) {
      member(orchestraId: $orchestraId, memberId: $memberId) {
         ...MemberDetail
      }
   }
   ${MemberDetail}
`;