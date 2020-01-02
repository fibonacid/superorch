import React from 'react';
import User from './User';
import useUsers from '../../hooks/useUsers';

function UserList(props) {

    const {users} = useUsers();

    return(
        <ul>
            {users.map((user, i) => <User key={i} user={user} />)}
        </ul>
    )
}

export default UserList;