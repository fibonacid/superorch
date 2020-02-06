import { gql } from "apollo-boost";

export const ChannelDetail = gql`
   fragment ChannelDetail on Channel {
      _id
      __typename
      name
   }
`;

export const getChannels = gql`
   query getChannels($orchestraId: String!) {
      channels(orchestraId: $orchestraId) {
         ...ChannelDetail
      }
   }
   ${ChannelDetail}
`;

export const getChannel = gql`
   query getChannel($orchestraId: String!, $channelId: String!) {
      channel(orchestraId: $orchestraId, channelId: $channelId) {
         ...ChannelDetail
      }
   }
   ${ChannelDetail}
`;