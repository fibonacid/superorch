import { gql } from "apollo-boost";
import {ChannelDetail} from './channels';
import {MemberDetail} from './members';

export const OrchestraDetail = gql`
   fragment OrchestraDetail on Orchestra {
      _id
      __typename
      name
   }
`;

export const getOrchestras = gql`
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
  ${OrchestraDetail}
  ${MemberDetail}
  ${ChannelDetail}
`;

export const getOrchestra = gql`
   query getOrchestra($id: String!) {
      orchestra(id: $id) {
         ...OrchestraDetail
         members {
            ...MemberDetail
         }
         channels {
            ...ChannelDetail
         }
      }
   }
   ${OrchestraDetail}
   ${MemberDetail}
   ${ChannelDetail}
`;

export const createOrchestra = gql`
   mutation createOrchestra($name: String) {
      ...OrchestraDetail
   }
   ${OrchestraDetail}
`;

export const updateOrchestra = gql`
  mutation updateOrchestra($orchestraId: String!, $name: String) {
    updateOrchestra(
      orchestraId: $orchestraId
      orchestraInput: { name: $name }
    ) {
      ...OrchestraDetail
    }
  }
  ${OrchestraDetail}
`;

export const deleteOrchestra = gql`
  mutation deleteOrchestra($orchestraId: String!) {
    deleteOrchestra(orchestraId: $orchestraId) {
      _id
    }
  }
`;
