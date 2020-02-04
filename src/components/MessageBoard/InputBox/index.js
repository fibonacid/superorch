import React, { useState, useCallback } from "react";
import styled from "styled-components/macro";

const StyledForm = styled.form`
  display: flex;
  padding: 10px;
`;

const StyledInput = styled.textarea`
  flex: 1;
  resize: none;
  border-radius: 10px;
  border: solid 1px lightgrey;
`;

const StyledButton = styled.input`
   margin-left: 5px;
   border-radius: 10px;
`;

export default function InputBox({ onSend }) {
  const [value, setValue] = useState("");

  const onChange = useCallback(event => {
    event.preventDefault();
    setValue(event.target.value);
  }, []);

  const onSubmit = useCallback(
    event => {
      event.stopPropagation();
      if (value) {
        onSend(value);
        setValue("");
      }
    },
    [value]
  );

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledInput value={value} onChange={onChange} />
      <StyledButton type="submit" />
    </StyledForm>
  );
}
