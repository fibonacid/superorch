import { useState, useEffect } from 'react';
import useUsersQuery from './useUsersQuery';
import useUserJoinedSubscription from './useUserJoinedSubscription';

function useUsersData() {

  const [users, setUsers] = useState([]);

    const {
      loading: usersLoading,
      error: usersError
    } = useUsersQuery(setUsers);

    const {
      loading: userJoinedLoading,
      error: userJoinedError
    } = useUserJoinedSubscription(users, setUsers);

    return { 
      users, 
      loading: {
        users: usersLoading, 
        userJoined: userJoinedLoading
      },
      errors: {
        users: usersError,
        userJoined: userJoinedError 
      }
    }
}

export default useUsersData;