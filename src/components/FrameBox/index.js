
import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
	flex: 1 0 auto;
`;

function FrameBox(props) {
    return (
        <StyledContainer>
            {props.children}
        </StyledContainer>
    )
};

export default FrameBox;