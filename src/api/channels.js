import { gql } from "apollo-boost";

export const CHANNEL_DETAIL_FRAGMENT = gql`
   fragment ChannelDetail on Channel {
      _id
      __typename
      name
   }
`;

export const GET_CHANNELS_QUERY = gql`
   query getChannels($orchestraId: String!) {
      channels(orchestraId: $orchestraId) {
         ...ChannelDetail
      }
   }
   ${CHANNEL_DETAIL_FRAGMENT}
`;

export const GET_CHANNEL_QUERY = gql`
   query getChannel($orchestraId: String!, $channelId: String!) {
      channel(orchestraId: $orchestraId, channelId: $channelId) {
         ...ChannelDetail
      }
   }
   ${CHANNEL_DETAIL_FRAGMENT}
`;