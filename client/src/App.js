import React from "react";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import configureClient from "./config/apollo";
import Routes from "./config/routes";

// Providers
import AuthProvider from "./components/_providers/AuthProvider";
import SelectionProvider from "./components/_providers/SelectionProvider";

// Components
import GlobalStyle, { StyledContent } from "./components/GlobalStyle";
import Navigation from "./components/Navigation";

let ipc;
try {
  //
  // This should throw an error
  // when application is runs on
  // a regular browser.
  //
  const electron = window.require("electron");
  ipc = electron.ipcRenderer;
} catch (err) {
  console.log(err);
}

const client = configureClient();

// ---------------------------------
// Application
// ---------------------------------
function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <AuthProvider>
        <SelectionProvider>
          <HashRouter>
            <StyledContent>
              <Navigation />
              <Routes />
            </StyledContent>
          </HashRouter>
        </SelectionProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
