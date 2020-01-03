import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import RegistrationForm from "../components/RegistrationForm";
import PrimaryForm from "../components/PrimaryForm";

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
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
      <StyledForm title="Register">
        <RegistrationForm />
      </StyledForm>
      <StyledLink to="/login">Back to login</StyledLink>
	 </Layout>
  )
}

export default RegisterView;
