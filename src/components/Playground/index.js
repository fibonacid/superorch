import React from 'react';
import styled from 'styled-components';
import SCEditor from '../SCEditor'

const StyledTitle = styled.h2`
    padding: 10px 5px;
    text-align: center; 
    background: whitesmoke;
    border-bottom: solid 1px lightgrey;
`;

function Playground(props) {
    return (
        <>
        <StyledTitle>SuperCollider Editor</StyledTitle>
        <SCEditor />
        </>
    )
}

export default Playground;