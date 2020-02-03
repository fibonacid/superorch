import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { channelByIdDocument } from '../../../config/documents';
import { useParams } from 'react-router-dom';

export default function ChannelChatView({ channelId }) {
   const params = useParams();
   const orchestraId = params.id;

   const { data, loading, error } = useQuery(channelByIdDocument, {
      variables: {
         orchestraId,
         channelId
      }
   });

   return (
      <div>
         {data && <h2> {data.channelById.name}</h2>}
         {error && <span>{error.message}</span>}
         {loading && <span>loading ...</span>}
      </div>
   )
}