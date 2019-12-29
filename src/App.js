import React, { useState } from "react";
import { HashRouter, Route } from "react-router-dom";
import AuthContext from "./context/auth-context";

//
// Components
//
import Header from './components/Header';

//
// Views
//
import HomeView from "./views/home";
import AuthView from "./views/auth";

const { ipcRenderer: ipc } = window.require("electron");

function App() {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiration);
  };
  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
  };

  return (
    <HashRouter>
      <div>
        <AuthContext.Provider value={{token, userId, tokenExpiration, login, logout }}>
          <Header />
          <Route path="/" exact component={HomeView} />
          <Route path="/login" exact component={AuthView} />
        </AuthContext.Provider>
      </div>
    </HashRouter>
  );
}

export default App;
