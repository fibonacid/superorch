import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.footer`
    flex-shrink: 0;
    background: whitesmoke;
    padding: 5px; 10px;
    border-top: solid 1px lightgrey;
`;

function Footer() {
    return(
        <StyledContainer>
            Here is some information
        </StyledContainer>
    )
}

export default Footer;