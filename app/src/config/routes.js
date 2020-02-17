import React from "react";

import HomeView from "../views/home";
import LoginView from "../views/login";
import RegisterView from "../views/register";

import AccountIndexView from "../views/account";
import AccountProfileView from "../views/account/profile";
import AccountSecurityView from "../views/account/security";

import OrchestraIndexView from "../views/orchestras";
import OrchestraCreateView from "../views/orchestras/create";
import OrchestraShowView from "../views/orchestras/show";
import OrchestraEditView from "../views/orchestras/show/edit";
import OrchestraInvitesView from "../views/orchestras/show/invites";
import OrchestraDeleteView from "../views/orchestras/show/delete";
import OrchestraChatIndexView from "../views/orchestras/show/chats";
import OrchestraChatShowView from "../views/orchestras/show/chats/show";

const routes = [
  {
    path: "/",
    exact: true,
    component: HomeView
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
      {
        path: "/account/security",
        component: AccountSecurityView
      },
      {
        // fallback on profile view
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
        path: "/orchestras/:orchestra",
        component: OrchestraShowView,
        routes: [
          {
            path: "/orchestras/:orchestra/edit",
            component: OrchestraEditView
          },
          {
            path: "/orchestras/:orchestra/delete",
            component: OrchestraDeleteView
          },
          {
            path: "/orchestras/:orchestra/invites",
            component: OrchestraInvitesView
          },
          {
            path: "/orchestras/:orchestra/chats",
            component: OrchestraChatIndexView,
            routes: [
              {
                path: "/orchestras/:orchestra/chats/:chat",
                component: OrchestraChatShowView
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    component: () => <div>404</div>
  }
];

export default routes;
