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

const StyledWrapper = styled.div`
  margin: auto;
`;

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
`;

const StyledStatus = styled.div`
  margin-top: 20px;
  text-align: center;
`;

function EditOrchestraView(props) {
  const params = useParams();

  const queryOptions = {
    variables: {
      orchestraId: params.id
    },
    skip: !params.id
  };

  // Get previous orchestra data to populate fields
  const { data: prevData } = useQuery(orchestraDocument, queryOptions);

  // Get function to update orchestra
  const [updateOrchestra, { data, loading, error }] = useMutation(
    updateOrchestraDocument
  );

  // Form submit callback
  function authenticate(values) {
    updateOrchestra({
      variables: { orchestraId: params.id, name: values.name },
      refetchQueries: [
        { query: orchestraListDocument },
        { query: orchestraDocument, ...queryOptions }
      ]
    });
  }

  return (
    <PrimaryLayout>
      <StyledWrapper>
        {prevData && (
          <StyledForm title={prevData.orchestraById.name}>
            <OrchestraForm
              authenticate={authenticate}
              cachedValues={prevData.orchestraById}
            />
          </StyledForm>
        )}
        <StyledStatus>
          {loading && <span>Loading ...</span>}
          {data && <div>Success</div>}
          {error && <span>{error.message}</span>}
        </StyledStatus>
      </StyledWrapper>
    </PrimaryLayout>
  );
}

export default EditOrchestraView;
