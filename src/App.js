import React from "react";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import configureClient from "./config/apollo";

// Providers
import AuthProvider from "./components/_providers/AuthProvider";

// Components
import GlobalStyle, {
  StyledWrapper,
  StyledContainer,
  StyledInner
} from "./components/GlobalStyle";
import BreakpointProvider from './components/_providers/BreakpointProvider';
import MainNav from "./components/MainNav";
import RouteConfig from "./components/RouteConfig";

const client = configureClient();

const queries = {
  xs: "(min-width: 320px)",
  sm: "(min-width: 720px)",
  md: "(min-width: 1024px)"
};

// ---------------------------------
// Application
// ---------------------------------
function App() {
  return (
    <BreakpointProvider queries={queries}>
      <ApolloProvider client={client}>
        <GlobalStyle />
        <AuthProvider>
          <HashRouter>
            <StyledWrapper>
              <MainNav />
              <StyledContainer>
                <StyledInner>
                  <RouteConfig />
                </StyledInner>
              </StyledContainer>
            </StyledWrapper>
          </HashRouter>
        </AuthProvider>
      </ApolloProvider>
    </BreakpointProvider>
  );
}

export default App;
