import React, { useEffect } from "react";
import useFormValidation from "../../../hooks/useFormValidation";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_ORCHESTRA_MUTATION, ORCHESTRAS_QUERY } from "../../../data/api";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
  name: ""
};

function CreateOrchestraForm(props) {
  const [createOrchestra, { data, loading, error: backendError }] = useMutation(
    CREATE_ORCHESTRA_MUTATION
  );

  useEffect(() => {
    if (data && props.onSuccess) {
      // Call function from parent
      props.onSuccess();
    }
  }, [data]);

  function validate(values) {
    const errors = {};
    // Password errors
    if (!values.name) {
      errors.name = "Required Name";
    }
    return errors;
  }

  function authenticate() {
    createOrchestra({
      variables: { name: values.name },
      refetchQueries: [{ query: ORCHESTRAS_QUERY }]
    });
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

export default CreateOrchestraForm;
