import { gql } from "apollo-boost";

export const ChannelDetail = gql`
   fragment ChannelDetail on Channel {
      _id
      __typename
      name
   }
`;

export const getChannels = gql`
   query channels {
      ...ChannelDetail
   }
   ${ChannelDetail}
`;

export const getChannel = gql`
   query channel($orchestraId: String!, $channelId: String!) {
      channel(orchestraId: $orchestraId, channelId: $channelId) {
         ...ChannelDetail
      }
   }
   ${ChannelDetail}
`;