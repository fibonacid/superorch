import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import PrimaryForm from "../components/PrimaryForm";

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

  const history = useHistory();
  const redirect = () => { 
    history.push("/");
  }

  return (
    <Layout>
      <StyledWrap>
         <PrimaryForm title="Login">
            <LoginForm onSuccess={redirect}/>
         </PrimaryForm>
      </StyledWrap>
      <StyledLink to="/register">Register instead</StyledLink>
    </Layout>
  )
}

export default LoginView;
