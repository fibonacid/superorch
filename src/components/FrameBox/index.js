
import React from 'react';
import styled, {css} from 'styled-components/macro';

const StyledContainer = styled.div`
    flex-grow: ${props => props.grow || "1"};;
    flex-shrink: ${props => props.shrink || "auto"};;
    flex-basis: ${props => props.basis || "auto"};
`;

function FrameBox(props) {
    return (
        <StyledContainer {...props}>
            {props.children}
        </StyledContainer>
    )
};

export default FrameBox;