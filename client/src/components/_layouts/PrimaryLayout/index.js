import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import Sidebar from "../../Sidebar";

const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const StyledContainer = styled.div`
  flex: 1 0 auto;
  position: relative;
`;

const StyledInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1px;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  flex: 1;
  display: flex;
`;

const StyledGoBack = styled.span`
  display: block;
  padding: 15px 10px;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  color: grey;
  cursor: pointer;
`;

function PrimaryLayout(props) {
  const history = useHistory();

  return (
    <StyledWrapper>
      <Sidebar />
      <StyledContainer>
        <StyledInner>
          <StyledContent>{props.children}</StyledContent>
          {props.back && (
            <StyledGoBack onClick={history.goBack}>{"<< go back"}</StyledGoBack>
          )}
        </StyledInner>
      </StyledContainer>
    </StyledWrapper>
  );
}

export default PrimaryLayout;
