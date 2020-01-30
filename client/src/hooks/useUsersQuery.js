import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY } from '../data/api';

export default function useUsersQuery(setUsers) {

   const { data, loading, error } = useQuery(USERS_QUERY)

   // Replace user list
   useEffect(() => {
      if(data) {
         // Filter out duplicates
         const ids = [...new Set(data.users.map(user => user._id))];
         
         setUsers(
            data.users
               .filter(user => (ids.some(id => id === user._id)))
               .map(user => ({ ...user, status: 'online' }))
         )
      }
   }, [data])

   return { data, loading, error }
}