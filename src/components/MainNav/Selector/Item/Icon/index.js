import React from "react";
import styled, {css} from "styled-components/macro";

const active = css`
  background: rgba(245,245,245, 1);
  color: rgba(0,0,0,1);
`

const StyledSquare = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  position: relative;
  border: solid 1px white;
  cursor: pointer;
  border-radius: 8px;

  &:not(:first-of-type) {
    margin-top: 10px;
  }

  ${props => props.active ? active : `
    background: rgba(245,245,245, 0);
    color: rgba(255,255,255,1);
  `};

  transition: background 0.2s ease-in;

  &:hover { ${active} }
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
