import React from 'react';
import styled from 'styled-components/macro';

const StyledContainer = styled.section`
  margin: 30px 10px;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

function Layout(props) {
  return (
    <StyledContainer>
      {props.children}
    </StyledContainer>
  )
}

export default Layout;
