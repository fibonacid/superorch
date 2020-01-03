import React, { useContext } from "react";
import styled from "styled-components";
//import AuthContext from "../context/auth-context";
import Layout from "../components/Layout";
import LoginForm from "../components/LoginForm";
import FormWrapper from "../components/FormWrapper";

const StyledWrap = styled.div`
  max-width: 200px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: 0 auto;
`;

function LoginView() {

  //const { token } = useContext(AuthContext);

  return (
    <Layout>
      <StyledWrap>
         <FormWrapper title="Login">
            <LoginForm />
         </FormWrapper>
      </StyledWrap>
    </Layout>
  )
}

export default LoginView;
