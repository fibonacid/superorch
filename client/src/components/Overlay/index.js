import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useQuery from "../../hooks/useQuery";

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

const StyledClose = styled(Link)`
  position: absolute;
  top: 15px;
  right: 15px;
  color: white;
  text-decoration: none;
`;

//const StyledContainer = styled.div``;

function Overlay() {
  const { display } = useQuery();

  if (!display || display === "none") {
    return null;
  }

  return (
    <StyledWrapper>
      <StyledClose to="?overlay=none">close</StyledClose>
    </StyledWrapper>
  );
}

export default Overlay;
