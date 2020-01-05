import React from 'react';
import styled from 'styled-components/';
import User from './User';
import useUsersQuery from '../../hooks/useUsersQuery';

//
// Displays a list of users
//
export default function UserList() {

    const { subscribeToUserJoined, data, loading, error } = useUsersQuery();

    // Subscribe to new users
    subscribeToUserJoined();

    return (
        <>
        {loading && <span>Loading ...</span>}
        {error && <Error message={error.message}/>}
        {data && (
            <ul>
                {data.users.map(
                    (user, i) => <User key={i} user={user} />
                )}
            </ul>
        )}
        </>
    )
}

const StyledError = styled.span`
    color: red;
`;

//
// Renders eventual errors
//
function Error(props) {
    return (
        <StyledError>{props.message}</StyledError>
    )
}