import React from "react";
import styled from "styled-components";
import { GET_INVITES_QUERY, ACCEPT_INVITE_MUTATION, denyInvite } from "../../../../api/invites";
import { GET_NOTIFICATIONS_QUERY } from "../../../../api/notifications";
import { GET_ORCHESTRAS_QUERY } from "../../../../api/orchestras";

import { useMutation } from "@apollo/react-hooks";

const StyledContainer = styled.li`
  padding: 5px;
`;

const StyledBtnWrap = styled.div`
  margin-top: 5px;
  display: flex;
`;

function Item({ invite }) {
  const [denyInvite] = useMutation(denyInvite);
  const [acceptInvite] = useMutation(ACCEPT_INVITE_MUTATION);

  const orchestra = invite.subject;
  const user = invite.from;

  const click = e => {
    if (e.target.name === "accept") {
      acceptInvite({
        variables: {
          inviteId: invite._id
        },
        refetchQueries: [
          { query: GET_ORCHESTRAS_QUERY },
          { query: GET_INVITES_QUERY },
          { query: GET_NOTIFICATIONS_QUERY }
        ]
      });
    } else if (e.target.name === "ignore") {
      denyInvite({
        variables: {
          inviteId: invite._id
        },
        refetchQueries: [{ query: GET_INVITES_QUERY }, { query: GET_NOTIFICATIONS_QUERY }]
      });
    }
  };

  return (
    <StyledContainer>
      <p>
        {user.name} invited you to {orchestra.name}
      </p>
      <StyledBtnWrap>
        <button name="accept" onClick={click}>
          accept
        </button>
        <button name="ignore" onClick={click}>
          ignore
        </button>
      </StyledBtnWrap>
    </StyledContainer>
  );
}

export default Item;
