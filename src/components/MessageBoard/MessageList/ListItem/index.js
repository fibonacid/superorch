import React from "react";
import styled from "styled-components";

const StyledContainer = styled.li`
  margin: 5px;
  display: flex;
  flex-direction: row-reverse;
`;

const StyledInner = styled.div`
   display: inline;
   background: white;
   padding: 8px;
   border-radius: 8px;
   font-size: 14px;
`;

export default function ListItem({ message }) {
  return (
    <StyledContainer>
       <StyledInner>
         {message.body}
       </StyledInner>
    </StyledContainer>
  );
}
