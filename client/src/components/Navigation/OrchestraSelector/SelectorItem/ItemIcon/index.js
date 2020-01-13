import React from "react";
import styled from "styled-components/macro";

const StyledSquare = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  position: relative;
  border: solid 1px white;
  border-radius: 8px;
  color: white;
  background: rgba(255, 255, 255, 0);
  transition: background 0.1s;
  cursor: pointer;
  &:not(:first-of-type) {
    margin-top: 10px;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StyledLetter = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function ItemIcon(props) {
  return (
    <StyledSquare className={props.className}>
      <StyledLetter>{props.letter}</StyledLetter>
    </StyledSquare>
  );
}

export default ItemIcon;
