import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}
  /* other styles */
  
  html {
    height: 100%;
    min-height: 100vh;
  }
  
  body {
    height: 100%;
  }
  
  #root {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;
