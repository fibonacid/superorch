import React, { useEffect } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

// Context
import AuthContext from "./context/auth-context";

// Hooks
import useAuth from "./hooks/useAuth";
import useUsers from "./hooks/useUsers";

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
const httpLink = new HttpLink({
  credentials: 'same-origin',
  uri: 'http://localhost:5000/graphql'
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql'
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

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
