import React, { useEffect, useContext } from "react";
import styled from 'styled-components/macro';
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import AuthContext from "../context/auth-context";
import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";
import CreateOrchestraView from "../views/orchestras/create";
import EditOrchestraView from "../views/orchestras/:id/edit";
import OrchestraView from "../views/orchestras/:id";
import InvitesOrchestraView from "../views/orchestras/:id/invites";
import DeleteOrchestraView from "../views/orchestras/:id/delete";
import AccountView from "../views/account";

const noob = () => null;

export default [
  {
    path: "/",
    exact: true,
    sidebar: noob,
    modal: noob,
    main: props => (props.token
      ? <HomeView/>
      : <LoginView />
    ), 
  },
  {
    path: "/login",
    sidebar: noob,
    modal: noob,
    main: props => (props.token
      ? <Redirect to="/"/>
      : <LoginView />
    ), 
  },
  {
    path: "/register",
    sidebar: noob,
    modal: noob,
    main: props => (props.token
      ? <Redirect to="/" />
      : <RegisterView />
    ),
  },
  // {
  //   path: "/",
  //   exact: false,
  //   sidebar: noob,
  //   modal: noob,
  //   main: props => (!props.token && 
  //     <Redirect to="/login" />
  //   ),
  // },
  // ===========================================
  // From this point on is only logged in views
  // ===========================================
  {
    path: "/account",
    sidebar: () => <div>Account Sidebar</div>,
    modal: noob,
    main: () => (<AccountView />)
  },
  {
    path: "/orchestras/create",
    sidebar: noob,
    modal: noob,
    main: () => (<CreateOrchestraView />),
  },
  {
    path: "/orchestras/:id",
    exact: true,
    sidebar: noob,
    modal: noob,
    main: () => (<OrchestraView />),
  },
  {
    path: "/orchestras/:id/edit",
    sidebar: noob,
    modal: noob,
    main: () => (<EditOrchestraView />),
  },
  {
    path: "/orchestras/:id/delete",
    sidebar: noob,
    modal: () => (<DeleteOrchestraView />),
    main: noob,
  },
  {
    path: "/orchestras/:id/invites",
    sidebar: noob,
    modal: noob,
    main: () => (<InvitesOrchestraView />),
  },
]
