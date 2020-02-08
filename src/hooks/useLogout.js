import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

export default function useLogout() {
  const history = useHistory();
  const context = useContext(AuthContext);

  const logout = () => {
    context.logout();
    history.push("/login");
  };

  return logout;
}
