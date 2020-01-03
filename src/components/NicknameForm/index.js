import React from "react";
import useFormValidation from "../../hooks/useFormValidation";
import useUpdateUserMutation from "../../hooks/useUpdateUserMutation"
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
   nickname: ""
};

function NicknameForm() {

  const [updateUser, { loading, error: backendError }] = useUpdateUserMutation();

  function validate(values) {
    const errors = {};
    // Password errors
    if (!values.nickname) {
      errors.nickname = 'Required Nickname';
    }
    return errors;
  }
  
   function authenticate() {
      updateUser({ variables: { nickname: values.nickname } })
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
        <PrimaryForm.Input
          type="text"
          name="nickname"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.nickname}
        />
        {errors.nickname && <PrimaryForm.Error>{errors.nickname}</PrimaryForm.Error>}
      </PrimaryForm.Field>
      {/* {backendError && <PrimaryForm.Error>{backendError}</PrimaryForm.Error>} */}
      <PrimaryForm.Button disabled={isSubmitting} type="submit">
        Submit
      </PrimaryForm.Button>
    </form>
    {/* {loading && <span>Loading ...</span>} */}
    </>
  );
}

export default NicknameForm;
