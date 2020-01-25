import React, { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  deleteOrchestraDocument,
  orchestraListDocument
} from "../../../data/documents";
import useFormValidation from "../../../hooks/useFormValidation";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
  name: ""
};

function DeleteOrchestraForm({ orchestra, redirect }) {
  const [deleteOrchestra, { data, loading, backendError }] = useMutation(
    deleteOrchestraDocument,
    {
      variables: { orchestraId: orchestra._id },
      refetchQueries: [{ query: orchestraListDocument }]
    }
  );

  useEffect(() => {
    if (data) {
      redirect();
    }
  }, [data]);

  function validate(values) {
    const errors = {};
    // Password errors
    if (!values.name) {
      errors.name = "Required Name";
    }
    if (values.name !== orchestra.name) {
      errors.name = "Names don't match";
    }
    return errors;
  }

  const authenticate = deleteOrchestra;

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
        <PrimaryForm.Input
          type="text"
          name="name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
        {errors.name && <PrimaryForm.Error>{errors.name}</PrimaryForm.Error>}
      </PrimaryForm.Field>
      <PrimaryForm.Button onClick={redirect}>Cancel</PrimaryForm.Button>
      <PrimaryForm.RiskyButton disabled={isSubmitting} type="submit">
        Submit
      </PrimaryForm.RiskyButton>
      <div>
        {loading && <div>...loading</div>}
        {backendError && <div>{backendError.message}</div>}
      </div>
    </form>
  );
}

export default DeleteOrchestraForm;
