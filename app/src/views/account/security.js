import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 15px 10px;
  flex-direction: column;
`;

export default function AccountSecurityView() {
  return <StyledContainer>Setup username and password</StyledContainer>;
}
