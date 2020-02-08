import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import PrimaryForm from "../components/_miscellaneous/PrimaryForm";
import LoginForm from "../components/_forms/LoginForm";

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

const StyledLink = styled(Link)`
  display: block;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: lightgrey;
  text-decoration: none;
`;

function LoginView() {
  const history = useHistory();
  const redirect = () => {
    history.push("/orchestras");
  };

  return (
    <StyledContainer>
      <StyledForm title="Login">
        <LoginForm onSuccess={redirect} />
      </StyledForm>
      <StyledLink to="/register">Register instead</StyledLink>
    </StyledContainer>
  );
}

export default LoginView;
