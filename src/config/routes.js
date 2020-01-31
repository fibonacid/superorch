import React from "react";

// import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";
import AccountView from "../views/account";

import OrchestraCreateView from "../views/orchestras/create";
import OrchestraIndexView from "../views/orchestras";
import OrchestraShowView from "../views/orchestras/show";
import OrchestraPlayView from "../views/orchestras/:id/play";
import OrchestraEditView from "../views/orchestras/:id/edit";
import OrchestraInvitesView from "../views/orchestras/:id/invites";

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
    component: AccountView,
    routes: []
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
        exact: true,
        component: OrchestraShowView,
        routes: [
          {
            path: "/orchestras/:id/edit",
            component: OrchestraEditView
          },
          {
            path: "/orchestras/:id/invites",
            component: OrchestraInvitesView
          },
          {
            path: "/orchestras/:id/play",
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
