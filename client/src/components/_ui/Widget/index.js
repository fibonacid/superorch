import React from "react";
import styled from "styled-components/macro";
import Draggable from "react-draggable";

const StyledContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 80px;
  min-width: 200px;
  background: whitesmoke;
  color: black;
  opacity: 0.97;
  border: solid 1px lightgrey;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const StyledClose = styled.span`
  margin: 5px 10px;
  cursor: pointer;
  text-align: end;
`;

function Widget(props) {
  return (
    <Draggable>
      <StyledContainer>
        <StyledHeader>
          <StyledClose onClick={props.close}>close</StyledClose>
        </StyledHeader>
        {props.children}
      </StyledContainer>
    </Draggable>
  );
}

export default Widget;
