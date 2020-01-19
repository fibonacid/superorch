import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";
import PrimaryLayout from "../../../components/_layouts/PrimaryLayout";
import PrimaryForm from "../../../components/_forms/PrimaryForm";
import InviteForm from "../../../components/_forms/InviteForm";

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

function InvitesOrchestraView() {
  const params = useParams();

  return (
    <PrimaryLayout back={true} rootpath={"/orchestras/" + params.id}>
      <StyledForm title="Send Invite">
        <InviteForm />
      </StyledForm>
    </PrimaryLayout>
  );
}

export default InvitesOrchestraView;
