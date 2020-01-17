import React from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  updateOrchestraDocument,
  orchestraListDocument,
  orchestraDocument
} from "../../data/documents";
import PrimaryLayout from "../../components/_layouts/PrimaryLayout";
import PrimaryForm from "../../components/_forms/PrimaryForm";
import OrchestraForm from "../../components/_forms/OrchestraForm";

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

function EditOrchestraView(props) {
  const params = useParams();

  // Get previous orchestra data to populate fields
  const { data: prevData } = useQuery(orchestraDocument, {
    variables: { orchestraId: params.id },
    skip: !params.id
  });

  // Get function to update orchestra
  const [updateOrchestra, { data, loading, error }] = useMutation(
    updateOrchestraDocument
  );

  // Form submit callback
  function authenticate(values) {
    updateOrchestra({
      variables: { orchestraId: params.id, name: values.name },
      refetchQueries: [{ query: orchestraListDocument, orchestraDocument }]
    });
  }

  return (
    <PrimaryLayout>
      {data && <div>Success</div>}
      {prevData && (
        <StyledForm title={prevData.orchestraById.name}>
          <OrchestraForm
            authenticate={authenticate}
            cachedValues={prevData.orchestraById}
          />
        </StyledForm>
      )}
      {loading && <span>Loading ...</span>}
      {error && <span>{error.message}</span>}
    </PrimaryLayout>
  );
}

export default EditOrchestraView;
