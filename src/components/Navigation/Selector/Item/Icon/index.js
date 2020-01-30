import React from "react";
import styled from "styled-components/macro";

const StyledSquare = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  position: relative;
  border: solid 1px white;
  background: ${props =>
    props.active ? "rgba(245,245,245,0.8)" : "transparent"};
  color: white;
  border-radius: 8px;
  transition: background 0.1s;
  cursor: pointer;
  &:not(:first-of-type) {
    margin-top: 10px;
  }
  &:hover {
    background: rgba(245, 245, 245, 0.8);
  }
`;

const StyledLetter = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function Icon(props) {
  return (
    <StyledSquare
      onClick={props.onClick}
      className={props.className}
      active={props.active}
    >
      <StyledLetter>{props.letter}</StyledLetter>
    </StyledSquare>
  );
}

export default Icon;
