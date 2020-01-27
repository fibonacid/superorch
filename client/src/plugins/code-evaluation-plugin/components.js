import React from "react";
import styled, { keyframes } from "styled-components/macro";

const blink = keyframes`
  0% {
    background: rgba(0,0,0);
  }
  100% {
    background: rgba(0,255,0, 1.0);
  }
`;

const StyledSpan = styled.span`
  animation: 0.3s ${blink};
`;

export function EvaluatedSpan({ entityKey, contentState, children }) {
  const entity = contentState.getEntity(entityKey);

  console.log(entity.data);

  return <StyledSpan>{children}</StyledSpan>;
}
