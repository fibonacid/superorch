import React from "react";
import styled from "styled-components/macro";
import { useHistory, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { orchestraDocument } from "../../../data/documents";
import PrimaryOverlay from "../../../components/_layouts/PrimaryOverlay";
import DeleteOrchestraForm from "../../../components/_forms/DeleteOrchestraForm";
import PrimaryForm from "../../../components/_forms/PrimaryForm";

const StyledContainer = styled.div`
  background: white;
  padding: 10px;
`;

function DeleteOrchestraView() {
  const history = useHistory();
  const params = useParams();
  const { data } = useQuery(orchestraDocument, {
    variables: { orchestraId: params.id }
  });

  const redirect = e => {
    e && e.stopPropagation();
    history.push("/");
  };

  return (
    <PrimaryOverlay>
      <StyledContainer>
        {data && (
          <PrimaryForm title="Delete Orchestra">
            <p>
              Confirm by entering the name of the orchestra you want to delete
            </p>
            <DeleteOrchestraForm
              orchestra={data.orchestraById}
              redirect={redirect}
            />
          </PrimaryForm>
        )}
      </StyledContainer>
    </PrimaryOverlay>
  );
}

export default DeleteOrchestraView;
