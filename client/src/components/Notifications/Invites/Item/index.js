import React from "react";
import styled from "styled-components";
import {
  acceptInviteDocument,
  invitesDocument,
  denyInviteDocument,
  notificationsDocument,
  orchestraListDocument
} from "../../../../config/documents";
import { useMutation } from "@apollo/react-hooks";

const StyledContainer = styled.li`
  padding: 5px;
`;

const StyledBtnWrap = styled.div`
  margin-top: 5px;
  display: flex;
`;

function Item({ invite }) {
  const [acceptInvite] = useMutation(acceptInviteDocument);
  const [denyInvite] = useMutation(denyInviteDocument);

  const orchestra = invite.subject;
  const user = invite.from;

  const click = e => {
    if (e.target.name === "accept") {
      acceptInvite({
        variables: {
          inviteId: invite._id
        },
        refetchQueries: [
          { query: orchestraListDocument },
          { query: invitesDocument },
          { query: notificationsDocument }
        ]
      });
    } else if (e.target.name === "ignore") {
      denyInvite({
        variables: {
          inviteId: invite._id
        },
        refetchQueries: [
          { query: invitesDocument },
          { query: notificationsDocument }
        ]
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
