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
import Login from "./views/login";

const { ipcRenderer: ipc } = window.require("electron");

function App() {
  return (
    <HashRouter>
      <div>
        <Header />
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </div>
    </HashRouter>
  );
}

export default App;
