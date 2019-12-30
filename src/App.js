import React, { useEffect } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import AuthContext from "./context/auth-context";
import useAuth from "./hooks/useAuth";

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

  useEffect(() => {
    token ? console.log('Logged in: ', token)
      : console.log('Logged out')
  }, [token]);

  return (
    <AuthContext.Provider value={{token, userId, tokenExpiration, login, logout }}>
      <GlobalStyle />
      <HashRouter>
        <StyledContent>
          <Header />
          {!token && <Redirect from="/" to="/auth" />}
          {!token && <Route path="/auth" exact component={AuthView} />}
          {token && <Redirect from="/auth" to="/" />}
          <Route path="/" exact component={HomeView} />
        </StyledContent>
        <Footer />
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;
