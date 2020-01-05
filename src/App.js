import React from "react";
import { HashRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import configureClient from './apollo';

// Components
import GlobalStyle, {StyledContent} from "./components/GlobalStyle";
import Authentication from './components/Authentication';
import Navigation from './components/Navigation';
import Routes from "./routes/index";

let ipc;
try {
  //
  // This should throw an error
  // when application is runs on
  // a regular browser.
  //
  const electron = window.require("electron");
  ipc = electron.ipcRenderer;
} catch(err) {
  console.log(err);
}

const client = configureClient();

// ---------------------------------
// Application
// ---------------------------------
function App() {
  return (
    <ApolloProvider client={client}>
      <Authentication>
          <GlobalStyle />
          <HashRouter>
            <StyledContent>
              <Navigation />
              <Routes />
            </StyledContent>
          </HashRouter>
        </Authentication>
    </ ApolloProvider>
  );
}

export default App;
