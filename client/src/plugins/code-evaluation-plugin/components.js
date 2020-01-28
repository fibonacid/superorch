import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components/macro";

const blink = keyframes`
  0% {
    background: rgba(25,25,255,0);
  }
  10% {
    background: rgba(25,25,255, 1.0);
  }
  100% {
    background: rgba(25,25,255,0);
  }
`;

const StyledSpan = styled.span`
  animation: 1s ${blink};
`;

export function EvaluatedSpan({ entityKey, contentState, children }) {
  const entity = contentState.getEntity(entityKey);

  console.log(entity.data);

  return <StyledSpan>{children}</StyledSpan>;
}
