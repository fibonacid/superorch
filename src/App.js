import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import configureClient from './apollo';

// Context
import AuthContext from "./context/auth-context";

// Hooks
import useAuth from "./hooks/useAuth";

// Components
import GlobalStyle, {StyledContent} from "./components/GlobalStyle";
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

  const {token, userId, tokenExpiration, login, logout} = useAuth();

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{token, userId, tokenExpiration, login, logout }}>
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
      </AuthContext.Provider>
    </ ApolloProvider>
  );
}

export default App;
