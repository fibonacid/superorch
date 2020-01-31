import React, { useCallback } from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { sendInviteDocument } from "../../../config/documents";
import PrimaryLayout from "../../../components/_layouts/PrimaryLayout";
import PrimaryForm from "../../../components/_miscellaneous/PrimaryForm";
import InviteForm from "../../../components/_forms/InviteForm";

const StyledContainer = styled.div`
  max-width: 300px;
  margin: auto;
`;

const StyledForm = styled(PrimaryForm)`
  border: solid 1px lightgrey;
  border-radius: 10px;
`;

const StyledStatus = styled.div`
  text-align: center;
  margin-top: 15px;
`;

function OrchestraInvitesView() {
  const params = useParams();

  const [sendInvite, { loading, data, error }] = useMutation(
    sendInviteDocument
  );

  const authenticate = useCallback(values => {
    sendInvite({
      variables: {
        orchestraId: params.id,
        email: values.email
      }
    });
  }, []);

  return (
    <PrimaryLayout back={true} rootpath={"/orchestras/" + params.id}>
      <StyledContainer>
        <StyledForm title="Send Invite">
          <InviteForm authenticate={authenticate} />
        </StyledForm>
        <StyledStatus>
          {loading && <p>loading ...</p>}
          {data && <p>success</p>}
          {error && <p>{error.message}</p>}
        </StyledStatus>
      </StyledContainer>
    </PrimaryLayout>
  );
}

export default OrchestraInvitesView;
