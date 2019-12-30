import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${props => 
        props.direction === 'vertical' 
        ? 'column' 
        : 'row'
    };
`;

function Frame(props) {
    return (
        <StyledContainer {...props}>
            {props.children}
        </StyledContainer>
    )
}

export default Frame;