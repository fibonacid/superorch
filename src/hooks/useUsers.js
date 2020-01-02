import { useState, useEffect } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { USER_JOINED_SUBSCRIPTION } from '../data/api';

const INITIAL_USERS = [
  { name: 'Lorenzo', status: 'Online' },
  { name: 'Marco', status: 'Online' },
  { name: 'Franca', status: 'Online' },
  { name: 'Nicola', status: 'Online' }
];

function useUsers() {

    const [users, setUsers] = useState(INITIAL_USERS);
    const { data, loading, error } = useSubscription(USER_JOINED_SUBSCRIPTION);

    useEffect(() => {
      if (loading) {
        console.log('Loading');
      } else {
        console.log('Not loading')
      }
    }, [loading]);

    useEffect(() => {
      if (error) {
        console.log(error);
      }
    }, [error]);

    useEffect(() => {
        if (data) {
          console.log('Success', data);
          //setUsers([...users, data]);
        }
    }, [data]);

    return { users }
}

export default useUsers;