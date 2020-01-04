import { useQuery } from '@apollo/react-hooks';
import { USERS_QUERY, USER_JOINED_SUBSCRIPTION } from '../data/api';

export default function useUsersQuery() {

   const { subscribeToMore, data, loading, error } = useQuery(
      USERS_QUERY,
      { fetchPolicy: 'network-only' }
   )

   const subscribeToUserJoined = () => {
      subscribeToMore(
         {
            document: USER_JOINED_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
               if (!subscriptionData.data) return prev;
               const newUser = subscriptionData.data.userJoined;

               return Object.assign({}, prev, {
                  users: [newUser, ...prev.data.users]
               });
            }
         }
      );
   }

   return { subscribeToUserJoined, data, loading, error }
}