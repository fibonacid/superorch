import {
   privateMessagesDocument,
   sendPrivateMessageDocument
 } from "../config/documents";
 import { useQuery, useMutation } from "@apollo/react-hooks";
 
 export default function usePrivateMessages(orchestraId, memberId) {
   const variables = {
     orchestraId,
     memberId
   };
 
   const { data } = useQuery(privateMessagesDocument, { variables });
 
   const [sendPrivateMessage] = useMutation(sendPrivateMessageDocument, {
     refetchQueries: [
       {
         query: privateMessagesDocument,
         variables
       }
     ]
   });
 
   return [
      data ? data.privateMessages : [], 
      sendPrivateMessage
    ];
 }
 