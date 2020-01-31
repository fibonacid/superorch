import React from "react";
import { useHistory } from "react-router-dom";
import useFormValidation from "../../../hooks/useFormValidation";
import { EMAIL_REGEX } from "../../../helpers/regex";
import * as PrimaryForm from "../../_miscellaneous/PrimaryForm";

const INITIAL_VALUES = {
  email: ""
};

function InviteForm({ authenticate }) {
  const history = useHistory();

  function validate(values) {
    const errors = {};
    if (!values.email) {
      errors.email = "Required Email";
    } else if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Invalid email address";
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
  } = useFormValidation(INITIAL_VALUES, validate, authenticate);

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
      <PrimaryForm.Button disabled={isSubmitting} onClick={history.goBack}>
        Cancel
      </PrimaryForm.Button>
      <PrimaryForm.Button disabled={isSubmitting} type="submit">
        Submit
      </PrimaryForm.Button>
    </form>
  );
}

export default InviteForm;
