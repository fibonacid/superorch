import React from "react";
import styled from "styled-components/macro";
import useGoBack from "../../../hooks/useGoBack";

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

const StyledClose = styled.p`
  text-align: right;
  display: block;
  color: white;
  padding: 15px 10px;
  cursor: pointer;
`;

function FullScreenOverlay(props) {
  const back = useGoBack();

  return (
    <StyledWrapper>
      <StyledClose onClick={back}>close</StyledClose>
      {props.children}
    </StyledWrapper>
  );
}

export default FullScreenOverlay;
