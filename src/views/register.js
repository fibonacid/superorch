import React, { useContext } from "react";
import styled from "styled-components";
//import AuthContext from "../context/auth-context";
import Layout from "../components/Layout";
import AuthForm from "../components/AuthForm";
import FormWrapper from "../components/FormWrapper";

const StyledWrap = styled.div`
  max-width: 200px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: 0 auto;
`;

function RegisterView() {

  //const { token } = useContext(AuthContext);

  return (
	 <Layout>
		<StyledWrap>
		  <FormWrapper title="Register">
				<AuthForm />
		  </FormWrapper>
		</StyledWrap>
	 </Layout>
  )
}

export default RegisterView;
