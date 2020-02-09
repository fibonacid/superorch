import React from "react";
import styled, {css} from "styled-components/macro";
import { NavLink } from "react-router-dom";

const activeStyle = {
  background: "rgba(255,255,255,1)",
  color: "black"
}

const StyledLink = styled(NavLink)`
  width: 40px;
  height: 40px;
  margin: 0 auto;
  display: block;
  position: relative;
  border: solid 1px white;
  cursor: pointer;
  border-radius: 8px;
  
  background: rgba(255,255,255,0);
  color: white;
  transition: background 0.2s ease-in;

  &:hover { ${css(activeStyle)} }

  &:not(:first-of-type) {
    margin-top: 10px;
  }
`;

const StyledLetter = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function SelectorIcon(props) {
  const letter = props.orchestra.name.charAt(0).toUpperCase();
  return (
    <StyledLink
      to={`/orchestras/${props.orchestra._id}`}
      activeStyle={activeStyle}
    >
      <StyledLetter>{letter}</StyledLetter>
    </StyledLink>
  );
}

export default SelectorIcon;
