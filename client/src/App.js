import React, { useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import configureClient from "./config/apollo";
import { soundTest } from "./helpers/electron";

// Providers
import AuthProvider from "./components/_providers/AuthProvider";

// Components
import GlobalStyle, {
  StyledWrapper,
  StyledContainer,
  StyledInner
} from "./components/GlobalStyle";
import Navigation from "./components/Navigation";
import Routes from "./config/routes";

const client = configureClient();

// ---------------------------------
// Application
// ---------------------------------
function App() {
  useEffect(function() {
    soundTest().then(result => console.log(result));
  }, []);

  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <AuthProvider>
        <HashRouter>
          <StyledWrapper>
            <Navigation />
            <StyledContainer>
              <StyledInner>
                <Routes />
              </StyledInner>
            </StyledContainer>
          </StyledWrapper>
        </HashRouter>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
