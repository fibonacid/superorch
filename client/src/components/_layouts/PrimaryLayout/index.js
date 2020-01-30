import React from "react";
import styled from "styled-components/macro";
import Sidebar from "../../Sidebar";
import GoBack from "./GoBack";

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
  flex-direction: column;
`;

function PrimaryLayout(props) {
  return (
    <StyledWrapper>
      <Sidebar />
      <StyledContainer>
        <StyledInner>
          <StyledContent>{props.children}</StyledContent>
          {props.back && <GoBack rootpath={props.rootpath} />}
        </StyledInner>
      </StyledContainer>
    </StyledWrapper>
  );
}

export default PrimaryLayout;
