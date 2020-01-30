import React from "react";
import styled, { css } from "styled-components/macro";
import Draggable from "react-draggable";

const StyledContainer = styled.div`
  position: absolute;
  z-index: 2;
  top: 10px;
  left: 80px;
  min-width: 200px;
  background: whitesmoke;
  color: black;
  border: solid 1px lightgrey;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  cursor: grab;
  ${props =>
    props.visible
      ? css`
          opacity: 0.95;
          pointer-events: auto;
        `
      : css`
          opacity: 0;
          pointer-events: none;
        `}
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
`;

const StyledClose = styled.span`
  margin: 5px 10px;
  cursor: pointer;
  text-align: end;
`;

function Widget(props) {
  return (
    <Draggable>
      <StyledContainer visible={props.visible}>
        <StyledHeader>
          <StyledClose onClick={props.close}>close</StyledClose>
        </StyledHeader>
        {props.children}
      </StyledContainer>
    </Draggable>
  );
}

export default Widget;
