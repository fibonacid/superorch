import React, { useEffect } from "react";
import useFormValidation from "../../../hooks/useFormValidation";
import useModifyUser from "../../../hooks/useModifyUser";
import * as PrimaryForm from "../PrimaryForm";

const INITIAL_VALUES = {
  firstName: "",
  lastName: "",
  city: "",
  birthdate: "",
  bio: ""
};

function UserProfileForm(props) {
  const [updateUser, { loading, error: backendError, data }] = useModifyUser();

  useEffect(() => {
    if (data && props.onSuccess) {
      // Call function from parent
      props.onSuccess();
    }
  }, [data]);

  function validate(_) {
    const errors = {};
    return errors;
  }

  function authenticate(values) {
    const keys = Object.keys(values);

    // Filter out empty fields
    let fields = {};
    keys.forEach(k => {
      if (values[k]) {
        fields[k] = values[k];
      }
    });

    updateUser({ variables: { userInput: fields } });
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
        {/* -------- first name -------- */}
        <PrimaryForm.Field>
          <label htmlFor="firstName">First Name</label>
          <PrimaryForm.Input
            type="text"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
          />
          {errors.firstName && (
            <PrimaryForm.Error>{errors.firstName}</PrimaryForm.Error>
          )}
        </PrimaryForm.Field>

        {/* -------- last name -------- */}
        <PrimaryForm.Field>
          <label htmlFor="lastName">Last Name</label>
          <PrimaryForm.Input
            type="text"
            name="lastName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
          />
          {errors.lastName && (
            <PrimaryForm.Error>{errors.lastName}</PrimaryForm.Error>
          )}
        </PrimaryForm.Field>

        {/* -------- city -------- */}
        <PrimaryForm.Field>
          <label htmlFor="city">City</label>
          <PrimaryForm.Input
            type="text"
            name="city"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.city}
          />
          {errors.city && <PrimaryForm.Error>{errors.city}</PrimaryForm.Error>}
        </PrimaryForm.Field>

        {/* -------- birth date -------- */}
        <PrimaryForm.Field>
          <label htmlFor="birthdate">Birth date</label>
          <PrimaryForm.Input
            type="date"
            name="birthdate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.birthdate}
          />
          {errors.birthdate && (
            <PrimaryForm.Error>{errors.birthdate}</PrimaryForm.Error>
          )}
        </PrimaryForm.Field>

        {/* -------- bio -------- */}
        <PrimaryForm.Field>
          <label htmlFor="bio">Short Biography</label>
          <PrimaryForm.Textarea
            type="textarea"
            name="bio"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.bio}
          />
          {errors.birthdate && (
            <PrimaryForm.Error>{errors.bio}</PrimaryForm.Error>
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
