import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useHistory, useParams } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
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
  const history = useHistory();
  const params = useParams();
  const [updateOrchestra, { data, loading, error }] = useMutation(
    updateOrchestraDocument
  );

  console.log(params);

  function authenticate(values) {
    updateOrchestra({
      variables: { orchestraId: params.id, name: values.name },
      refetchQueries: [{ query: orchestraListDocument, orchestraDocument }]
    });
  }

  useEffect(() => {
    if (data && props.onSuccess) {
      history.push("/");
    }
  }, [data]);

  return (
    <PrimaryLayout>
      <StyledForm title="Edit Orchestra">
        <OrchestraForm authenticate={authenticate} />
      </StyledForm>
      {loading && <span>Loading ...</span>}
      {error && <span>{error.message}</span>}
    </PrimaryLayout>
  );
}

export default EditOrchestraView;
