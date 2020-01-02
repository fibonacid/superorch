import { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { USER_JOINED_SUBSCRIPTION, USERS_QUERY } from '../data/api';

function useUsers() {

    const {
      data: usersData, 
      loading: usersDataLoading, 
      error: usersDataError 
    } = useQuery(USERS_QUERY)

    const { 
      data: userJoinedData, 
      loading: userJoinedLoading, 
      error: userJoinedError 
    } = useSubscription(USER_JOINED_SUBSCRIPTION);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); 
    const [users, setUsers] = useState([]);

    // Set Loading
    useEffect(() => {
      setLoading(usersDataLoading && userJoinedLoading)
    }, [usersDataLoading, userJoinedLoading]);

    // Set errors
    useEffect(() => {
      if (userJoinedError) {
        setErrors({ ...errors, userJoined: userJoinedError })
      }
      if (usersDataError) {
        setErrors({ ...errors, users: usersDataError })
      }
    }, [userJoinedError, usersDataError]);

    // Replace user list
    useEffect(() => {
      if(usersData) {
        console.log('Success', usersData);
        setUsers(usersData.users.map(user => ({
          nickname: user.nickname, 
          status: "online" 
        })))
      }
    }, [usersData])

    // Add new user to the list
    useEffect(() => {
        if (userJoinedData) {
          console.log('Success', userJoinedData);
          setUsers(
            [ 
              ...users,
              { 
                nickname: userJoinedData.userJoined.nickname, 
                status: "online" 
              }
            ]
          );
        }
    }, [userJoinedData]);

    return { users, loading, errors }
}

export default useUsers;