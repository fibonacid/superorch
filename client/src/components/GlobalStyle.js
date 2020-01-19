import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${reset};
  ${normalize}
  /* other styles */
  
  html, body, #root {
    height: 100%;
    font-family: sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

export default GlobalStyle;

export const StyledContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex: 1 0 auto;
  display: flex;
  flex-direction: row;
`;
