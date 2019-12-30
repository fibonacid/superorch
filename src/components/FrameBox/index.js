
import React from 'react';
import styled, {css} from 'styled-components/macro';

const StyledContainer = styled.div`
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: ${props => props.basis || "auto"};
`;

function FrameBox(props) {
    return (
        <StyledContainer className={props.className}>
            {props.children}
        </StyledContainer>
    )
};

export default FrameBox;