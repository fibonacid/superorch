import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';

// Context
import AuthContext from "./context/auth-context";

// Hooks
import useAuth from "./hooks/useAuth";
import useApollo from "./hooks/useApollo";

// Components
import GlobalStyle, {StyledContent} from "./components/GlobalStyle";
import Header from './components/Header';
import Footer from './components/Footer';

// Views
import HomeView from "./views/home";
import AuthView from "./views/auth";

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

// ---------------------------------
// Application
// ---------------------------------
function App() {

  const {token, userId, tokenExpiration, login, logout} = useAuth();
  const { client } = useApollo(token);

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
