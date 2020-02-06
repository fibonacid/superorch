import {
   GET_PRIVATE_MESSAGES_QUERY,
   SEND_PRIVATE_MESSAGE_MUTATION
 } from "../api/messages";
 import { useQuery, useMutation } from "@apollo/react-hooks";
 
 export default function usePrivateMessages(orchestraId, memberId) {
   const variables = {
     orchestraId,
     memberId
   };
 
   const { data } = useQuery(GET_PRIVATE_MESSAGES_QUERY, { variables });
 
   const [sendPrivateMessage] = useMutation(SEND_PRIVATE_MESSAGE_MUTATION, {
     refetchQueries: [
       {
         query: GET_PRIVATE_MESSAGES_QUERY,
         variables
       }
     ]
   });
 
   return [
      data ? data.privateMessages : [], 
      sendPrivateMessage
    ];
 }
 