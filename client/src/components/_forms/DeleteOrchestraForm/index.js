import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import {
  deleteOrchestraDocument,
  orchestraListDocument
} from "../../../config/documents";
import useFormValidation from "../../../hooks/useFormValidation";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
  name: ""
};

function DeleteOrchestraForm({ orchestra }) {
  const history = useHistory();
  const [deleteOrchestra, { loading, backendError }] = useMutation(
    deleteOrchestraDocument,
    {
      variables: { orchestraId: orchestra._id },
      refetchQueries: [{ query: orchestraListDocument }],
      onCompleted: () => {
        history.push("/");
      }
    }
  );

  function validate(values) {
    const errors = {};

    // Password errors
    if (!values.name) {
      errors.name = "Required Name";
    } else if (values.name !== orchestra.name) {
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
      <PrimaryForm.Button disabled={isSubmitting} onClick={history.goBack}>
        Cancel
      </PrimaryForm.Button>
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
