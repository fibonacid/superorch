import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledWrapper = styled.div`
  background: red;
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
`;

const StyledClose = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  color: white;
  cursor: pointer;
`;

function Overlay(props) {
  const history = useHistory();

  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <StyledWrapper>
      <StyledClose onClick={back}>close</StyledClose>
      {props.children}
    </StyledWrapper>
  );
}

export default Overlay;
