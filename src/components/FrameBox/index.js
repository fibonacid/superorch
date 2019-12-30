
import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: ${props => props.basis || "100%"}
`;

function FrameBox(props) {
    return (
        <StyledContainer {...props}>
            {props.children}
        </StyledContainer>
    )
};

export default FrameBox;