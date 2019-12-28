import React from "react";
import { HashRouter, Route } from "react-router-dom";

//
// Components
//
import Header from './components/Header';

//
// Views
//
import Home from "./views/home";
import Auth from "./views/auth";

const { ipcRenderer: ipc } = window.require("electron");

function App() {
  return (
    <HashRouter>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Auth} />
      </div>
    </HashRouter>
  );
}

export default App;
