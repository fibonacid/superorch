import React from 'react';
import styled from 'styled-components';
import User from './User';
import useUsersData from '../../hooks/useUsersData';

//
// Displays a list of users
//
export default function UserList(props) {

    const { users, loading, errors } = useUsersData();

    return (
        <>
        {loading && <span>Loading ...</span>}
        {errors && <Errors errors={errors}/>}
        {users && (
            <ul>
                {users.map(
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
function Errors({ errors }) {
    return Object.keys(errors).map(
        (key, i) => {
            if (errors[key]) {
                return (
                    <StyledError key={i}>
                        {errors[key].message}
                    </StyledError>
                )
            }
        }
    )
}