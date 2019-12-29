import React from "react";
import styled from "styled-components";
import AuthForm from "../components/AuthForm";
import Layout from "../components/Layout";

const StyledWrap = styled.div`
  border: solid 1px black;
  margin: 10%;
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
