import React from "react";
import useFormValidation from "../../../hooks/useFormValidation";
import * as PrimaryForm from "../PrimaryForm";

function OrchestraForm({ cachedValues = {}, authenticate }) {
  const initialValues = {
    name: "",
    ...cachedValues
  };

  function validate(values) {
    const errors = {};
    // Password errors
    if (!values.name) {
      errors.name = "Required Name";
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
  } = useFormValidation(initialValues, validate, authenticate);

  return (
    <form onSubmit={handleSubmit}>
      <PrimaryForm.Field>
        <label htmlFor="name">Name</label>
        <PrimaryForm.Input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && <PrimaryForm.Error>{errors.name}</PrimaryForm.Error>}
      </PrimaryForm.Field>
      <PrimaryForm.Button disabled={isSubmitting} type="submit">
        Submit
      </PrimaryForm.Button>
    </form>
  );
}

export default OrchestraForm;
