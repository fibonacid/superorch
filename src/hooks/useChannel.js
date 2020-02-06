import { useState, useEffect } from 'react';
import {channelDocument} from '../config/documents';
import {useQuery} from '@apollo/react-hooks';

export default function useChannel(orchestraId, channelId) {
   const [channel, setChannel] = useState(null);
   const { data } = useQuery(channelDocument, {
      variables: {
         orchestraId,
         channelId
      }
   });

   useEffect(() => {
      if(data) {
         setChannel(
            data.channel
         )
      }
   }, [data])

   return channel;
}