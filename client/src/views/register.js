import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Layout from "./partials/layout";

import PrimaryForm from "../components/Forms/PrimaryForm";
import RegistrationForm from "../components/Forms/RegistrationForm";
import NicknameForm from "../components/Forms/NicknameForm";

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

function RegisterView() {
  const [index, setIndex] = useState(0);
  const nextForm = useCallback(() => {
    setIndex(index + 1);
  }, [index]);

  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };

  return (
    <Layout>
      {/* First part: email and password */}
      {index === 0 && (
        <>
          <StyledForm title="Register">
            <RegistrationForm onSuccess={nextForm} />
          </StyledForm>
          <StyledLink to="/login">Back to login</StyledLink>
        </>
      )}
      {/* Second part: choose nickname */}
      {index === 1 && (
        <>
          <StyledForm title="Choose a nickname">
            <NicknameForm onSuccess={redirect} />
          </StyledForm>
          <StyledLink to="/">Skip</StyledLink>
        </>
      )}
    </Layout>
  );
}

export default RegisterView;
