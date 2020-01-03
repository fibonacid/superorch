import React from "react";
import useFormValidation from "../../hooks/useFormValidation";
import useLoginQuery from "../../hooks/useLoginQuery";
import { EMAIL_REGEX } from "../../helpers/regex";
import * as PrimaryForm from "../PrimaryForm";

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
    } 
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
      <PrimaryForm.Field>
        <label htmlFor="email">Email</label>
        <PrimaryForm.Input
          type="text"
          name="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {errors.email && <PrimaryForm.Error>{errors.email}</PrimaryForm.Error>}
      </PrimaryForm.Field>
      <PrimaryForm.Field>
        <label htmlFor="password">Password</label>
        <PrimaryForm.Input
          type="password"
          name="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
        />
        {errors.password && <PrimaryForm.Error>{errors.password}</PrimaryForm.Error>}
      </PrimaryForm.Field>
      {backendError && <PrimaryForm.Error>{backendError}</PrimaryForm.Error>}
      <PrimaryForm.Button disabled={isSubmitting} type="submit">
        Submit
      </PrimaryForm.Button>
    </form>
    {loading && <span>Loading ...</span>}
    </>
  );
}

export default LoginForm;
