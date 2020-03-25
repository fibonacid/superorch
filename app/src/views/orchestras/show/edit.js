import React from "react";
import styled from "styled-components/macro";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  UPDATE_ORCHESTRA_MUTATION,
  GET_ORCHESTRAS_QUERY,
  GET_ORCHESTRA_QUERY
} from "../../../api/orchestras";
import PrimaryForm from "../../../components/_miscellaneous/PrimaryForm";
import OrchestraForm from "../../../components/_forms/OrchestraForm";
import BackgroundLink from "../../../components/_miscellaneous/BackgroundLink";
import GoBackLink from "../../../components/_miscellaneous/GoBackLink";

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

function OrchestraEditView() {
  const params = useParams();

  const orchestraId = params.orchestra;

  const queryOptions = {
    variables: { orchestraId },
    skip: !orchestraId
  };

  // Get previous orchestra data to populate fields
  const { data: prevData } = useQuery(GET_ORCHESTRA_QUERY, queryOptions);

  // Get function to update orchestra
  const [updateOrchestra, { data, loading, error }] = useMutation(
    UPDATE_ORCHESTRA_MUTATION
  );

  // Form submit callback
  function authenticate(values) {
    updateOrchestra({
      variables: { orchestraId, name: values.name },
      refetchQueries: [
        { query: GET_ORCHESTRAS_QUERY },
        { query: GET_ORCHESTRA_QUERY, ...queryOptions }
      ]
    });
  }

  return (
    <StyledContainer>
      <StyledWrapper>
        {prevData && (
          <StyledForm title="Edit Orchestra">
            <OrchestraForm
              authenticate={authenticate}
              cachedValues={prevData.orchestra}
            />
          </StyledForm>
        )}
        <StyledStatus>
          {loading && <span>Loading ...</span>}
          {data && <div>Success</div>}
          {error && <span>{error.message}</span>}
        </StyledStatus>
        <BackgroundLink to={`/orchestras/${orchestraId}/delete`}>
          Delete Orchestra
        </BackgroundLink>
      </StyledWrapper>
      <GoBackLink rootpath={"/orchestras/" + params.orchestra} />
    </StyledContainer>
  );
}

export default OrchestraEditView;

// <Link
// key={i.id}
// to={{
//   pathname: `/img/${i.id}`,
//   // This is the trick! This link sets
//   // the `background` in location state.
//   state: { background: location }
// }}
// >
