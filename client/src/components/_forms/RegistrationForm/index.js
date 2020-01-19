import React, { useEffect } from "react";
import useFormValidation from "../../../hooks/useFormValidation";
import useRegister from "../../../hooks/useRegister";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../../helpers/regex";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
  name: "",
  email: "",
  password: "",
  passwordConf: ""
};

// --------------------------
// Authentication Form
// --------------------------

function RegistrationForm(props) {
  const [register, { loading, error: backendError, data }] = useRegister();

  useEffect(() => {
    if (data && props.onSuccess) {
      // Call function from parent
      props.onSuccess();
    }
  }, [data]);

  //
  // Rules for input validation
  //
  function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "Required username";
      // todo: add username regex check
    }
    // Email errors
    if (!values.email) {
      errors.email = "Required Email";
    } else if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Invalid email address";
    }
    // Password errors
    if (!values.password) {
      errors.password = "Required Password";
    } else if (!PASSWORD_REGEX.test(values.password)) {
      errors.password = "Password must be at least 4 characters";
    }
    if (values.passwordConf.trim().length === 0) {
      errors.passwordConf = "Confirm password";
    } else if (values.password.trim() !== values.passwordConf.trim()) {
      errors.passwordConf = "Passwords are different";
    }
    return errors;
  }

  function authenticate() {
    const { name, email, password } = values;
    register({ variables: { name, email, password } });
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_VALUES, validate, authenticate);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PrimaryForm.Field>
          <label htmlFor="name">Username</label>
          <PrimaryForm.Input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
          />
          {errors.email && <PrimaryForm.Error>{errors.name}</PrimaryForm.Error>}
        </PrimaryForm.Field>
        <PrimaryForm.Field>
          <label htmlFor="email">Email</label>
          <PrimaryForm.Input
            type="text"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && (
            <PrimaryForm.Error>{errors.email}</PrimaryForm.Error>
          )}
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
          {errors.password && (
            <PrimaryForm.Error>{errors.password}</PrimaryForm.Error>
          )}
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
          {errors.passwordConf && (
            <PrimaryForm.Error>{errors.passwordConf}</PrimaryForm.Error>
          )}
        </PrimaryForm.Field>
        {backendError && (
          <PrimaryForm.Error>{backendError.message}</PrimaryForm.Error>
        )}
        <PrimaryForm.Button disabled={isSubmitting} type="submit">
          Submit
        </PrimaryForm.Button>
      </form>
      {loading && <span>Loading ...</span>}
    </>
  );
}

export default RegistrationForm;
