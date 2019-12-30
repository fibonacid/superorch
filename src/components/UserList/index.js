import React from 'react';
import User from './User';

function UserList(props) {
    return(
        <ul>
            <User user={{name: 'Marco', status: 'online' }} />
            <User user={{name: 'Franca', status: 'online'}} />
            <User user={{name: 'Lorenzo', status: 'online'}} />
            <User user={{name: 'Nicola', status: 'online'}} />
        </ul>
    )
}

export default UserList;