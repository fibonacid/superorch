import React from "react";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
import Layout from "../components/Layout";

const StyledWrap = styled.div`
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: 10% auto;
  width: 50%;
`;

function AuthView(props) {
  return (
    <Layout>
      <StyledWrap>
        <AuthForm />
      </StyledWrap>
    </Layout>
  )
}

export default AuthView;
