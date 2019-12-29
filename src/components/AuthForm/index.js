import React, { useState, useContext } from "react";
import styled from "styled-components";
import Api from "../../data/api";
import AuthContext from "../../context/auth-context";
import useFormValidation from "../../hooks/useFormValidation";

//
//  Styles
//

const StyledWrap = styled.div`
  padding: 10px;
`;

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

const StyledField = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin-top: 5px;
`;

const StyledButton = styled.button`
  margin-top: 10px;
  width: 100%;
`;

const StyledError = styled.p`
  margin-top: 5px;
  color: red;
`;

// Initial form values
const INITIAL_STATE = {
  email: "",
  password: ""
};

//
// Authenticate user on the server.
//
function AuthForm() {

  const context = useContext(AuthContext);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth, authenticateUser);

  const [backendError, setBackendError] = useState(null);

  //
  // send login request and save
  // token, userId and tokenExpiration
  // into the context.
  //
  async function authenticateUser() {
    const { email, password } = values;
    try {
      const res = await Api.signIn(email, password);

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const { data } = await res.json();

      // Save authentication data
      context.login(
        data.login.token,
        data.login.userId,
        data.login.tokenExpiration,
      );

    } catch(err) {
      setBackendError(err.message);
    }
  }

  //
  // Rules for input validation
  //
  function validateAuth(values) {
    const errors = {};
    // Password errors
    if (!values.email) {
      errors.email = 'Required Email';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    // Password errors
    if (!values.password) {
      errors.password = 'Required Password'
    } else if (values.password.length < 4) {
      errors.password = 'Password must be at least 4 characters'
    }
    return errors;
  }


  return (
    <StyledWrap>
      <StyledTitle>Sign in</StyledTitle>
      <form onSubmit={handleSubmit}>
        <StyledField>
          <label htmlFor="email">Email</label>
          <StyledInput
            type="text"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && <StyledError>{errors.email}</StyledError>}
        </StyledField>
        <StyledField>
          <label htmlFor="password">Password</label>
          <StyledInput
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && <StyledError>{errors.password}</StyledError>}
        </StyledField>
        {backendError && <StyledError>{backendError}</StyledError>}
        <StyledButton disabled={isSubmitting} type="submit">
          Submit
        </StyledButton>
      </form>
    </StyledWrap>
  );
}

export default AuthForm;
