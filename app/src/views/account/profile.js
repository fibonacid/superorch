import React from "react";
import styled from "styled-components/macro";
import useUserProfile from "../../hooks/useUserProfile";
import PrimaryForm from "../../components/_miscellaneous/PrimaryForm";
import UserProfileForm from "../../components/_forms/UserProfileForm";

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 15px 10px;
  flex-direction: column;
`;

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

export default function AccountProfileView() {
  const userProfile = useUserProfile();

  return (
    <StyledContainer>
      {userProfile && (
        <StyledForm title="User Profile">
          <UserProfileForm cachedValues={userProfile} />
        </StyledForm>
      )}
    </StyledContainer>
  );
}
