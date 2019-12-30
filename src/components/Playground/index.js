import React from 'react';
import styled from 'styled-components';
import Frame from '../Frame';
import SCEditor from '../SCEditor'

const StyledContainer = styled(Frame)`
    height: 100%;
`;

const StyledTitle = styled.h2`
    padding: 10px 5px;
    text-align: center; 
    background: whitesmoke;
    border-bottom: solid 1px lightgrey;
`;

function Playground(props) {
    return (
        <StyledContainer direction="vertical">
            <StyledTitle>SuperCollider Editor</StyledTitle>
            <SCEditor />
        </StyledContainer>
    )
}

export default Playground;