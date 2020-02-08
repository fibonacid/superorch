import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {}
});

export function AuthProvider(props) {
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