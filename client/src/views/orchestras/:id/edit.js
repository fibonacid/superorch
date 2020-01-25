import React from "react";
import styled from "styled-components/macro";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  updateOrchestraDocument,
  orchestraListDocument,
  orchestraDocument
} from "../../../config/documents";
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
  display: flex;
  flex-direction: column;
  align-items: center;
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

const StyledButton = styled.button`
  background: red;
  color: white;
  min-width: 100px;
  cursor: pointer;
`;

function EditOrchestraView() {
  const history = useHistory();
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

  // Display an overlay with the delete view
  const handleDelete = () => {
    history.push({
      pathname: `/orchestras/${orchestraId}/delete`,
      state: { background: location }
    });
  };

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
          <StyledButton onClick={handleDelete}>Delete</StyledButton>
        </StyledWrapper>
      </StyledContainer>
    </PrimaryLayout>
  );
}

export default EditOrchestraView;

// <Link
// key={i.id}
// to={{
//   pathname: `/img/${i.id}`,
//   // This is the trick! This link sets
//   // the `background` in location state.
//   state: { background: location }
// }}
// >
