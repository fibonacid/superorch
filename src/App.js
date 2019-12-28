import React from "react";
import { HashRouter, Route } from "react-router-dom";

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
  return (
    <HashRouter>
      <div>
        <Header />
        <Route path="/" exact component={HomeView} />
        <Route path="/login" exact component={AuthView} />
      </div>
    </HashRouter>
  );
}

export default App;
