import React from "react";
import styled from "styled-components/macro";
import { useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  updateOrchestraDocument,
  orchestraListDocument,
  orchestraDocument
} from "../../../data/documents";
import PrimaryLayout from "../../../components/_layouts/PrimaryLayout";
import PrimaryForm from "../../../components/_forms/PrimaryForm";
import OrchestraForm from "../../../components/_forms/OrchestraForm";

const StyledContainer = styled.div`
  margin: 15px 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

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
  const location = useLocation();
  const params = useParams();
  const orchestraId = params.id;

  const queryOptions = {
    variables: { orchestraId },
    skip: !orchestraId
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
      variables: { orchestraId, name: values.name },
      refetchQueries: [
        { query: orchestraListDocument },
        { query: orchestraDocument, ...queryOptions }
      ]
    });
  }

  return (
    <PrimaryLayout back={true} rootpath={"/orchestras/" + params.id}>
      <StyledContainer>
        <StyledWrapper>
          {prevData && (
            <StyledForm title="Edit Orchestra">
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
      </StyledContainer>
    </PrimaryLayout>
  );
}

export default EditOrchestraView;
