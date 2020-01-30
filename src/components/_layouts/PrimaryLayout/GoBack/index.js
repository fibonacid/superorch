import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

const StyledGoBack = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 10px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin: 0 5px;
`;

export default function GoBack({ rootpath }) {
  const history = useHistory();

  const redirect = () => {
    if (rootpath) {
      history.push(rootpath);
    } else {
      history.goBack();
    }
  };

  return (
    <StyledGoBack>
      <div onClick={redirect}>
        <StyledIcon icon={faLongArrowAltLeft} />
        <span>go back</span>
      </div>
    </StyledGoBack>
  );
}
