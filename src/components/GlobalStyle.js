import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import normalize from "styled-normalize";

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}
  /* other styles */
`;

export default GlobalStyle;
