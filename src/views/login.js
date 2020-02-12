import React from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import PrimaryForm from "../components/_miscellaneous/PrimaryForm";
import LoginForm from "../components/_forms/LoginForm";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 15px 10px;
  flex-direction: column;
`;

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: lightgrey;
  text-decoration: none;
`;

const StyledError = styled.p`
  margin-top: 20px;
  color: red;
`;

function LoginView() {
  const { token } = useAuth();
  const [login, { loading, error }] = useLogin();

  if (token) {
    return <Redirect to="/" />;
  }
  if (loading) {
    return (
      <StyledContainer>
        <span>...loading</span>
      </StyledContainer>
    );
  }

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledForm title="Login">
          <LoginForm login={login} />
        </StyledForm>
        {error && <StyledError>{error.message}</StyledError>}
      </StyledContainer>
      <StyledLink to="/register">Register instead</StyledLink>
    </StyledWrapper>
  );
}

export default LoginView;
