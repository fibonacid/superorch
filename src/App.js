import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import configureClient from './apollo';

// Components
import GlobalStyle, {StyledContent} from "./components/GlobalStyle";
import Authentication from './components/Authentication';
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import HomeView from "./views/home";
import RegisterView from "./views/register";
import LoginView from "./views/login";

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
              <Header />
              {/* {token && <Redirect from="/auth" to="/" /> } */}
              <Route path="/" exact component={HomeView} />
              <Route path="/login" exact component={LoginView} />
              <Route path="/register" exact component={RegisterView} />
            </StyledContent>
            <Footer />
          </HashRouter>
        </Authentication>
    </ ApolloProvider>
  );
}

export default App;
