import React from "react";
import styled from "styled-components/macro";
import useGoBack from "../../../hooks/useGoBack";

const StyledWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 80px;
  width: 300px;
  display: flex;
`;

const StyledContainer = styled.div`
  background: whitesmoke;
  color: black;
  opacity: 0.97;
  border: solid 1px lightgrey;
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
  flex: 1;
`;

const StyledClose = styled.p`
  text-align: right;
  display: block;
  margin: 5px 10px;
  cursor: pointer;
`;

function SideOverlay(props) {
  const back = useGoBack();

  return (
    <StyledWrapper>
      <StyledContainer>{props.children}</StyledContainer>
      <StyledClose onClick={back}>close</StyledClose>
    </StyledWrapper>
  );
}

export default SideOverlay;
