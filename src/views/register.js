import React from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import RegistrationForm from "../components/RegistrationForm";
import PrimaryForm from "../components/PrimaryForm";
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

function RegisterView() {
  return (
	 <Layout>
		<StyledWrap>
		  <PrimaryForm title="Register">
				<RegistrationForm />
		  </PrimaryForm>
		</StyledWrap>
    <StyledLink to="/login">Back to login</StyledLink>
	 </Layout>
  )
}

export default RegisterView;
