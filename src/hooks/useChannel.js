import { useState, useEffect } from 'react';
import {channelByIdDocument} from '../config/documents';
import {useQuery} from '@apollo/react-hooks';

export default function useChannel(orchestraId, channelId) {
   const [channel, setChannel] = useState(null);
   const { data } = useQuery(channelByIdDocument, {
      variables: {
         orchestraId,
         channelId
      }
   });

   useEffect(() => {
      if(data) {
         setChannel(
            data.channelById
         )
      }
   }, [data])

   return channel;
}