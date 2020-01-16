import React, { useEffect } from "react";
import useFormValidation from "../../../hooks/useFormValidation";
import useModifyUser from "../../../hooks/useModifyUser";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
  nickname: ""
};

function UserProfileForm(props) {
  const [updateUser, { loading, error: backendError, data }] = useModifyUser();

  useEffect(() => {
    if (data && props.onSuccess) {
      // Call function from parent
      props.onSuccess();
    }
  }, [data]);

  function validate(values) {
    const errors = {};
    // Password errors
    if (!values.nickname) {
      errors.nickname = "Required Nickname";
    }
    return errors;
  }

  function authenticate() {
    updateUser({ variables: { nickname: values.nickname } });
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
          <label htmlFor="nickname">Nickname</label>
          <PrimaryForm.Input
            type="text"
            name="nickname"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.nickname}
          />
          {errors.nickname && (
            <PrimaryForm.Error>{errors.nickname}</PrimaryForm.Error>
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

export default UserProfileForm;