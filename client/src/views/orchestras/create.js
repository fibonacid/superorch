import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import {
  createOrchestraDocument,
  orchestraListDocument
} from "../../config/documents";
import SecondaryLayout from "../../components/_layouts/SecondaryLayout";
import PrimaryForm from "../../components/_forms/PrimaryForm";
import OrchestraForm from "../../components/_forms/OrchestraForm";

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

function CreateOrchestraView() {
  const [createOrchestra, { data, loading, error }] = useMutation(
    createOrchestraDocument
  );

  function authenticate(values) {
    createOrchestra({
      variables: { name: values.name },
      refetchQueries: [{ query: orchestraListDocument }]
    });
  }

  const history = useHistory();
  useEffect(() => {
    if (data) {
      history.push("/");
    }
  }, [data, history]);

  return (
    <SecondaryLayout>
      <StyledForm title="Create Orchestra">
        <OrchestraForm authenticate={authenticate} />
      </StyledForm>
      {loading && <span>Loading ...</span>}
      {error && <span>{error.message}</span>}
    </SecondaryLayout>
  );
}

export default CreateOrchestraView;
