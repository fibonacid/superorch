import React, { useEffect } from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import {
  CREATE_ORCHESTRA_MUTATION,
  GET_ORCHESTRAS_QUERY
} from "../../api/orchestras";
import SecondaryLayout from "../../components/_layouts/SecondaryLayout";
import PrimaryForm from "../../components/_miscellaneous/PrimaryForm";
import OrchestraForm from "../../components/_forms/OrchestraForm";

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

function OrchestraCreateView() {
  const [createOrchestra, { data, loading, error }] = useMutation(
    CREATE_ORCHESTRA_MUTATION
  );

  function authenticate(values) {
    createOrchestra({
      variables: { name: values.name },
      refetchQueries: [{ query: GET_ORCHESTRAS_QUERY }]
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

export default OrchestraCreateView;
