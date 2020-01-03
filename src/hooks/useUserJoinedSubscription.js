import { useEffect } from 'react';
import { useSubscription } from '@apollo/react-hooks';
import { USER_JOINED_SUBSCRIPTION } from '../data/api';

export default function useUserJoinedSubscription(users, setUsers) {
    const { data, loading, error } = useSubscription(USER_JOINED_SUBSCRIPTION);

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
        if (data) {
            try {
                handleUserJoined(data.userJoined)
            } catch(err) {
                console.log(err.message);
            }
        }
    }, [data]);

    return { data, loading, error }
}