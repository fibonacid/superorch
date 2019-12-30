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

// --------------------------
// Authentication Form
// --------------------------

function AuthForm() {

  const context = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [backendError, setBackendError] = useState(null);

  //
  // send login request and save
  // token, userId and tokenExpiration
  // into the context.
  //
  async function authenticateUser() {
    const { email, password } = values;
    console.log('Authenticate user', email, password);
    try {
      const res = await Api.signIn(email, password);
  
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const { data } = await res.json();
      console.log(res.status, data);

      // Save authentication data and leave.
      context.login(
        data.login.token,
        data.login.userId,
        data.login.tokenExpiration,
      );

    } catch(err) {
      setBackendError(err.message);
    }
  }

  async function registrateUser() {
    const { email, password } = values;
    console.log('Registrate user', email, password);
    try {
      const res = await Api.signUp(email, password);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const { data } = await res.json();
      console.log(res.status, data);

      authenticateUser();

    } catch(err) {
      setBackendError(err.message);
    }
  }

  const INITIAL_VALUES = {
    email: "",
    password: "",
    passwordConf: ""
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
    if(!isLogin) {
      if(values.passwordConf.trim().length === 0) {
        errors.passwordConf = 'Confirm password'
      } else if(values.password.trim() !== values.passwordConf.trim()) {
        errors.passwordConf = 'Passwords are different'
      }
    }
    return errors;
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_VALUES, validateAuth, isLogin ? authenticateUser : registrateUser);

  function handleSwitchMode() {
    setIsLogin(!isLogin);
  }

  return (
    <StyledWrap>
      <StyledTitle>{isLogin ? "Sign in" : "Sign up"}</StyledTitle>
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
        {!isLogin && <StyledField>
          <label htmlFor="password">Password confirmation</label>
          <StyledInput
            type="password"
            name="passwordConf"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.passwordConf}
          />
          {errors.passwordConf && <StyledError>{errors.passwordConf}</StyledError>}
        </StyledField>}
        {backendError && <StyledError>{backendError}</StyledError>}
        <StyledButton disabled={isSubmitting} type="submit">
          Submit
        </StyledButton>
        <StyledButton onClick={handleSwitchMode}>
          switch to {isLogin ? 'sign up' : 'sign in' }
        </StyledButton>
      </form>
    </StyledWrap>
  );
}

export default AuthForm;
