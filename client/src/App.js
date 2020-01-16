import React from "react";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import configureClient from "./apollo";

// Components
import GlobalStyle, { StyledContent } from "./components/GlobalStyle";
import AuthProvider from "./components/Providers/AuthProvider";
import Navigation from "./components/Navigation";
import Routes from "./routes";
import OrchestraProvider from "./components/Providers/OrchestraProvider";

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
        <OrchestraProvider>
          <HashRouter>
            <StyledContent>
              <Navigation />
              <Routes />
            </StyledContent>
          </HashRouter>
        </OrchestraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
