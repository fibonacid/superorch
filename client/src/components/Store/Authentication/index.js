import React from "react";
import useAuth from "../../../hooks/useAuth";
import AuthContext from "../../../context/auth-context";

export default function Authentication(props) {
  const { token, userId, tokenExpiration, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        tokenExpiration,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
