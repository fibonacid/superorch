import React, { useEffect } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import AuthContext from "./context/auth-context";
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import useAuth from "./hooks/useAuth";

// Components
import GlobalStyle, {StyledContent} from "./components/GlobalStyle";
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import HomeView from "./views/home";
import AuthView from "./views/auth";
import { ApolloClient } from "apollo-boost";

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

//
// Create Apollo Client
//
const cache = new InMemoryCache();
const link = new HttpLink({
  credentials: 'same-origin',
  uri: 'http://localhost:5000/graphql'
});

const client = new ApolloClient({ cache, link });

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
            {token && <Redirect from="/auth" to="/" /> }
            <Route path="/auth" exact component={AuthView} />
            <Route path="/" exact component={HomeView} />
          </StyledContent>
          <Footer />
        </HashRouter>
      </AuthContext.Provider>
    </ ApolloProvider>
  );
}

export default App;
