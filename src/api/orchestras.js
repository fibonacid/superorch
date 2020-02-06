import { gql } from "apollo-boost";
import {CHANNEL_DETAIL_FRAGMENT} from './channels';
import {MEMBER_DETAIL_FRAGMENT} from './members';

export const ORCHESTRA_DETAIL_FRAGMENT = gql`
   fragment OrchestraDetail on Orchestra {
      _id
      __typename
      name
   }
`;

export const GET_ORCHESTRAS_QUERY = gql`
  query getOrchestras {
    orchestras {
      ...OrchestraDetail
      members {
         ...MemberDetail
      }
      channels {
         ...ChannelDetail
      }
    }
  }
  ${ORCHESTRA_DETAIL_FRAGMENT}
  ${MEMBER_DETAIL_FRAGMENT}
  ${CHANNEL_DETAIL_FRAGMENT}
`;

export const GET_ORCHESTRA_QUERY = gql`
   query getOrchestra($orchestraId: String!) {
      orchestra(orchestraId: $orchestraId) {
         ...OrchestraDetail
         members {
            ...MemberDetail
         }
         channels {
            ...ChannelDetail
         }
      }
   }
   ${ORCHESTRA_DETAIL_FRAGMENT}
   ${MEMBER_DETAIL_FRAGMENT}
   ${CHANNEL_DETAIL_FRAGMENT}
`;

export const CREATE_ORCHESTRA_MUTATION = gql`
   mutation createOrchestra($name: String) {
      ...OrchestraDetail
   }
   ${ORCHESTRA_DETAIL_FRAGMENT}
`;

export const UPDATE_ORCHESTRA_MUTATION = gql`
  mutation updateOrchestra($orchestraId: String!, $name: String) {
    updateOrchestra(
      orchestraId: $orchestraId
      orchestraInput: { name: $name }
    ) {
      ...OrchestraDetail
    }
  }
  ${ORCHESTRA_DETAIL_FRAGMENT}
`;

export const DELETE_ORCHESTRA_MUTATION = gql`
  mutation deleteOrchestra($orchestraId: String!) {
    deleteOrchestra(orchestraId: $orchestraId) {
      _id
    }
  }
`;
