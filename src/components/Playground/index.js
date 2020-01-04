import React from 'react';
import styled from 'styled-components/macro';
import Frame from '../Frame';
import SCEditor from '../SCEditor'

const StyledWrapper = styled(Frame)`
   height: 100%;
`;

const StyledContainer = styled.div`
    height: 100%;
`;

const StyledTitle = styled.h2`
    flex: 0 1 auto;
    padding: 10px 5px;
    text-align: center; 
    background: whitesmoke;
    border-bottom: solid 1px lightgrey;
`;

function Playground(props) {
    return (
        <StyledWrapper direction="vertical">
            <StyledTitle>SuperCollider Editor</StyledTitle>
            <StyledContainer>
                <SCEditor />
            </StyledContainer>
        </StyledWrapper>
    )
}

export default Playground;