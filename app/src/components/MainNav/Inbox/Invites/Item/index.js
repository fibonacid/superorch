import React, { useCallback } from "react";
import styled from "styled-components";
import {
  GET_INVITES_QUERY,
  ACCEPT_INVITE_MUTATION,
  DENY_INVITE_MUTATION
} from "../../../../../api/invites";
import { GET_ORCHESTRAS_QUERY } from "../../../../../api/orchestras";
import { useMutation } from "@apollo/react-hooks";

const StyledContainer = styled.li`
  padding: 5px;
`;

const StyledBtnWrap = styled.div`
  margin-top: 5px;
  display: flex;
`;

function Item({ invite }) {
  const [denyInvite] = useMutation(DENY_INVITE_MUTATION, {
    variables: {
      inviteId: invite._id
    },
    refetchQueries: [{ query: GET_INVITES_QUERY }]
  });

  const [acceptInvite] = useMutation(ACCEPT_INVITE_MUTATION, {
    variables: {
      inviteId: invite._id
    },
    refetchQueries: [
      { query: GET_ORCHESTRAS_QUERY },
      { query: GET_INVITES_QUERY }
    ]
  });

  const orchestra = invite.subject;
  const user = invite.from;

  const click = useCallback(
    function({ target }) {
      if (target.name === "accept") {
        acceptInvite();
      } else if (target.name === "ignore") {
        denyInvite();
      }
    },
    [acceptInvite, denyInvite]
  );

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
