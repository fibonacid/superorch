import { useState, useEffect } from 'react';
import {memberDocument} from '../config/documents';
import {useQuery} from '@apollo/react-hooks';

export default function useMember(orchestraId, memberId) {
   const [member, setMember] = useState(null);
   const { data } = useQuery(memberDocument, {
      variables: {
         orchestraId,
         memberId
      }
   });

   useEffect(() => {
      if(data) {
         setMember(
            data.member
         )
      }
   }, [data])

   return member;
}