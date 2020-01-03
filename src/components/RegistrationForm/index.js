import React from "react";
import useFormValidation from "../../hooks/useFormValidation";
import useCreateUserMutation from "../../hooks/useCreateUserMutation";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../helpers/regex";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
  email: "",
  password: "",
  passwordConf: ""
}

// --------------------------
// Authentication Form
// --------------------------

function RegistrationForm() {

  const [createUser, { loading, error: backendError }] = useCreateUserMutation();

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
    }  else if (
      !PASSWORD_REGEX.test(values.password)
    ) {
      errors.password = 'Password must be at least 4 characters'
    }
   if(values.passwordConf.trim().length === 0) {
      errors.passwordConf = 'Confirm password'
   } else if(values.password.trim() !== values.passwordConf.trim()) {
      errors.passwordConf = 'Passwords are different'
   }
    return errors;
  }

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
      <PrimaryForm.Field>
        <label htmlFor="password">Password confirmation</label>
        <PrimaryForm.Input
          type="password"
          name="passwordConf"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.passwordConf}
        />
        {errors.passwordConf && <PrimaryForm.Error>{errors.passwordConf}</PrimaryForm.Error>}
      </PrimaryForm.Field>
      {backendError && <PrimaryForm.Error>{backendError}</PrimaryForm.Error>}
      <PrimaryForm.Button disabled={isSubmitting} type="submit">
        Submit
      </PrimaryForm.Button>
    </form>
  );
}

export default RegistrationForm;
