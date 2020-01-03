import React, { useState, useContext } from "react";
import styled from "styled-components/macro";
import { useMutation } from '@apollo/react-hooks';
import AuthContext from "../../context/auth-context";
import useFormValidation from "../../hooks/useFormValidation";
import {CREATE_USER_MUTATION} from "../../data/api";

//
//  Styles
//

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

const INITIAL_VALUES = {
  email: "",
  password: "",
  passwordConf: ""
}

// --------------------------
// Authentication Form
// --------------------------

function RegistrationForm() {

  const context = useContext(AuthContext);

  const [backendError, setBackendError] = useState(null);

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
   if(values.passwordConf.trim().length === 0) {
      errors.passwordConf = 'Confirm password'
   } else if(values.password.trim() !== values.passwordConf.trim()) {
      errors.passwordConf = 'Passwords are different'
   }
    return errors;
  }

  const [createUser, {}] = useMutation(
    CREATE_USER_MUTATION, 
    {
      onCompleted: (data) => {
        console.log('Success', data);
      },
      onError: (error) => {
        setBackendError(error.message)
      }
    }
  );

  function registrateUser() {
    const { email, password } = values;
    createUser({ variables: { email, password } })
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_VALUES, validateAuth, registrateUser);

  return (
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
      <StyledField>
        <label htmlFor="password">Password confirmation</label>
        <StyledInput
          type="password"
          name="passwordConf"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConf}
        />
        {errors.passwordConf && <StyledError>{errors.passwordConf}</StyledError>}
      </StyledField>
      {backendError && <StyledError>{backendError}</StyledError>}
      <StyledButton disabled={isSubmitting} type="submit">
        Submit
      </StyledButton>
    </form>
  );
}

export default RegistrationForm;
