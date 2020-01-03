import { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { USER_JOINED_SUBSCRIPTION, USERS_QUERY } from '../data/api';

function useUsers() {

    const {
      data: queryData, 
      loading: queryDataLoading, 
      error: queryDataError 
    } = useQuery(USERS_QUERY)

    const { 
      data: subscriptionData, 
      loading: subscriptionDataLoading, 
      error: subscriptionDataError 
    } = useSubscription(USER_JOINED_SUBSCRIPTION);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); 
    const [users, setUsers] = useState([]);

    // Set Loading
    useEffect(() => {
      setLoading(queryDataLoading && subscriptionDataLoading)
    }, [queryDataLoading, subscriptionDataLoading]);

    // Set errors
    useEffect(() => {
      if (subscriptionDataError) {
        setErrors({ ...errors, subscriptionData: subscriptionDataError })
      }
      if (queryDataError) {
        setErrors({ ...errors, users: queryDataError })
      }
    }, [subscriptionDataError, queryDataError]);

    //
    // Replaces the user list
    //
    function replaceUserList(userList) {
      // Filter out duplicates
      const ids = [...new Set(userList.map(user => user._id))];
      
      setUsers(
        userList
          .filter(user => (ids.some(id => id === user._id)))
          .map(user => ({ ...user, status: 'online' }))
      )
    }

    // Replace user list
    useEffect(() => {
      if(queryData) {
        replaceUserList(queryData.users)
      }
    }, [queryData])

    //
    // Adds a new user to the list
    //
    function handleUserJoined(newUser) {
      // Filter out duplicates
      if (users.some(user => user._id === newUser._id)) {
        throw new Error('User already exist')
      }
      setUsers([ ...users, { 
        nickname: newUser.nickname, 
        status: "online" 
      }]);
    }

    // Add new user to the list
    useEffect(() => {
      if (subscriptionData) {
        try {
          handleUserJoined(subscriptionData.userJoined)
        } catch(err) {
          console.log(err.message);
        }
      }
    }, [subscriptionData]);

    return { users, loading, errors }
}

export default useUsers;