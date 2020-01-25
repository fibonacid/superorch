import React from "react";
import styled from "styled-components/macro";
import SecondaryLayout from "../components/_layouts/SecondaryLayout";
import PrimaryForm from "../components/_forms/PrimaryForm";
import UserProfileForm from "../components/_forms/UserProfileForm";

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

export default function AccountView() {
  return (
    <SecondaryLayout>
      <StyledForm title="User Settings">
        <UserProfileForm />
      </StyledForm>
    </SecondaryLayout>
  );
}
