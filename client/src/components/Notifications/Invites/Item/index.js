import React, { useState } from "react";
import styled from "styled-components";
import {
  acceptInviteDocument,
  invitesDocument,
  notificationsDocument
} from "../../../../data/documents";
import { useMutation } from "@apollo/react-hooks";

const StyledContainer = styled.li`
  padding: 5px;
`;

const StyledBtnWrap = styled.div`
  margin-top: 5px;
  display: flex;
`;

function Item({ invite }) {
  const [disabled, setDisabled] = useState(false);
  const [acceptInvite] = useMutation(acceptInviteDocument);

  const orchestra = invite.subject;
  const user = invite.from;

  const click = e => {
    if (e.target.name === "accept") {
      acceptInvite({
        variables: {
          inviteId: invite._id
        },
        refetchQueries: [
          { query: invitesDocument },
          { query: notificationsDocument }
        ]
      });
    }

    setDisabled(true);
  };

  return (
    <StyledContainer>
      <p>
        {user.name} invited you to {orchestra.name}
      </p>
      <StyledBtnWrap>
        <button name="accept" onClick={click} disabled={disabled}>
          accept
        </button>
        <button name="ignore" onClick={click} disabled={disabled}>
          ignore
        </button>
      </StyledBtnWrap>
    </StyledContainer>
  );
}

export default Item;
