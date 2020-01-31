import React from "react";

// import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";

import AccountIndexView from "../views/account";
import AccountProfileView from "../views/account/profile"

import OrchestraIndexView from "../views/orchestras";
import OrchestraShowView from "../views/orchestras/show";
import OrchestraCreateView from "../views/orchestras/create";
import OrchestraPlayView from "../views/orchestras/:id/play";
import OrchestraEditView from "../views/orchestras/:id/edit";
import OrchestraInvitesView from "../views/orchestras/:id/invites";
import OrchestraDeleteView from "../views/orchestras/:id/delete";

const routes = [
  {
    path: "/",
    exact: true,
    component: LoginView,
    routes: []
  },
  {
    path: "/login",
    component: LoginView,
    routes: []
  },
  {
    path: "/register",
    component: RegisterView,
    routes: []
  },
  // ===========================================
  // From this point on is only logged in views
  // ===========================================
  {
    path: "/account",
    component: AccountIndexView,
    routes: [
      {
        path: "/account/profile",
        component: AccountProfileView
      },
      { // fallback on profile view
        path: "/account",
        component: AccountProfileView
      }
    ]
  },
  {
    path: "/orchestras",
    component: OrchestraIndexView,
    routes: [
      {
        path: "/orchestras/create",
        component: OrchestraCreateView
      },
      {
        path: "/orchestras/:id",
        component: OrchestraShowView,
        routes: [
          {
            path: "/orchestras/:id/edit",
            component: OrchestraEditView
          },
          {
            path: "/orchestras/:id/delete",
            component: OrchestraDeleteView
          },
          {
            path: "/orchestras/:id/invites",
            component: OrchestraInvitesView
          },
          { // fallback on play view
            path: "/orchestras/:id",
            component: OrchestraPlayView
          },
        ]
      },
    ]
  },
  {
    path: "*",
    component: () => <div>404</div>,
  }
]

export default routes;
