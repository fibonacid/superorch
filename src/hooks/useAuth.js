import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useBreakpoint must be used within BreakpointProvider");
  }
  return context;
}

export default useAuth;
