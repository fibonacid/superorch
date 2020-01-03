import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.li`
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px lightgrey;
`;

function User(props) {
    return (
        <StyledContainer>
            <span>{props.user.nickname}</span>
            <span>{props.user.status}</span>
        </StyledContainer>
    )
}

export default User;