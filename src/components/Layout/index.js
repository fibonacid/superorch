import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.section`
  height: 100%;
  flex: 1;
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
