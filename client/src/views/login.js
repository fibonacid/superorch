import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "./partials/layout";
import LoginForm from "../components/_forms/LoginForm";
import PrimaryForm from "../components/_forms/PrimaryForm";

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
    history.push("/");
  };

  return (
    <Layout>
      <StyledForm title="Login">
        <LoginForm onSuccess={redirect} />
      </StyledForm>
      <StyledLink to="/register">Register instead</StyledLink>
    </Layout>
  );
}

export default LoginView;
