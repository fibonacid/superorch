import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/Layout";
import PrimaryForm from "../components/PrimaryForm";
import RegistrationForm from "../components/RegistrationForm";
import NicknameForm from "../components/NicknameForm";

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

  const [index, setIndex] = useState(0);

  return (
	 <Layout>
     {/* First part: email and password */}
     {index === 0 && <>
      <StyledForm title="Register">
          <RegistrationForm />
        </StyledForm>
        <StyledLink to="/login">Back to login</StyledLink>
     </>}
     {/* Second part: choose nickname */}
     {index === 1 && <>
      <StyledForm title="Choose a nickname">
        <NicknameForm />
      </StyledForm>
      <StyledLink to="/">Skip</StyledLink>
     </>}
	 </Layout>
  )
}

export default RegisterView;
