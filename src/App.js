import React from "react";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import configureClient from "./config/apollo";
import { AuthProvider } from "./context/auth-context";
import { BreakpointProvider } from "./context/breakpoint-context";

// Components
import GlobalStyle, {
  StyledWrapper,
  StyledContainer,
  StyledInner
} from "./components/GlobalStyle";
import MainNav from "./components/MainNav";
import RootSwitch from "./components/RootSwitch";

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
                  <RootSwitch />
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
