import React, { useContext } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import FormWrapper from "../components/FormWrapper";
import { Link } from "react-router-dom";

const StyledWrap = styled.div`
  max-width: 200px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: 0 auto;
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
  return (
    <Layout>
      <StyledWrap>
         <FormWrapper title="Login">
            <LoginForm />
         </FormWrapper>
      </StyledWrap>
      <StyledLink to="/register">Register instead</StyledLink>
    </Layout>
  )
}

export default LoginView;
