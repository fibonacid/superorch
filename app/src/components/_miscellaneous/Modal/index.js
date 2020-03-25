import React from "react";
import styled from "styled-components/macro";

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Modal(props) {
  return <StyledWrapper>{props.children}</StyledWrapper>;
}
