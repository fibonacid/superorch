import { useState, useEffect } from 'react';
import {memberByIdDocument} from '../config/documents';
import {useQuery} from '@apollo/react-hooks';

export default function useMember(orchestraId, memberId) {
   const [member, setMember] = useState(null);
   const { data } = useQuery(memberByIdDocument, {
      variables: {
         orchestraId,
         memberId
      }
   });

   useEffect(() => {
      if(data) {
         setMember(
            data.memberById
         )
      }
   })

   return member;
}