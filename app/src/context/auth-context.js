import React, { createContext } from "react";
import { useState, useEffect } from "react";
import { useApolloClient } from "@apollo/react-hooks";

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {}
});

export function AuthProvider(props) {
  const client = useApolloClient();

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpiration, setTokenExpiration] = useState(null);

  // Intialize auth variables with
  // values from local storage.
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
    setTokenExpiration(localStorage.getItem("tokenExpiration"));
  }, []);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
    setTokenExpiration(tokenExpiration);

    // Reset apollo client cache
    // --------------------------
    // This should be delayed a bit to prevent
    // an unhandled promise rejection caused
    // by the token not being set a the time of
    // the refetches
    setTimeout(() => {
      client.resetStore();
    }, 100);
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setTokenExpiration(null);
    // Cleare local storage
    localStorage.clear();
    // Reset apollo client cache
    client.resetStore();
  };

  // When new auth data is retrieved:
  useEffect(() => {
    if (token && userId && tokenExpiration) {
      console.log("Logged in");
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("tokenExpiration", tokenExpiration);
    }
  }, [token, userId, tokenExpiration]);

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
