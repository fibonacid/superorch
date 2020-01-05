import React from 'react';
import styled from 'styled-components/macro';
import Frame from '../Frame';
import SCEditor from '../SCEditor'

const StyledTitle = styled.h2`
    padding: 10px 5px;
    text-align: center; 
    background: whitesmoke;
    border-bottom: solid 1px lightgrey;
`;

function Playground(props) {
    return (
        <Frame direction="vertical">
            <StyledTitle>SuperCollider Editor</StyledTitle>
            <SCEditor />
        </Frame>
    )
}

export default Playground;