import React from "react";
import styled from "styled-components/macro";
import useFormValidation from "../../hooks/useFormValidation";
import useLoginQuery from "../../hooks/useLoginQuery";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../helpers/regex";

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
  password: ""
}

// --------------------------
// Authentication Form
// --------------------------

function LoginForm() {

  const [login, { loading, error: backendError }] = useLoginQuery();

  //
  // Rules for input validation
  //
  function validateAuth(values) {
    const errors = {};
    // Password errors
    if (!values.email) {
      errors.email = 'Required Email';
    } else if (
      !EMAIL_REGEX.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }
    // Password errors
    if (!values.password) {
      errors.password = 'Required Password'
    } else if (
      !PASSWORD_REGEX.test(values.password)
    )
    return errors;
  }
  

   function authenticateUser() {
      const { email, password } = values;
      login({ variables: { email, password } })
   }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_VALUES, validateAuth, authenticateUser);

  return (
    <>
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
    {loading && <span>Loading ...</span>}
    </>
  );
}

export default LoginForm;
