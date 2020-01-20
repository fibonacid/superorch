import React from "react";
import styled from "styled-components";

const StyledContainer = styled.li`
  padding: 5px;
`;

const StyledBtnWrap = styled.div`
  margin-top: 5px;
  display: flex;
`;

function Item({ invite }) {
  console.log(invite);

  const orchestra = invite.subject;
  const user = invite.from;

  return (
    <StyledContainer>
      <p>
        {user.name} invited you to {orchestra.name}
      </p>
      <StyledBtnWrap>
        <button>join</button>
        <button>ignore</button>
      </StyledBtnWrap>
    </StyledContainer>
  );
}

export default Item;
