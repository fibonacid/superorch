import { useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { loginDocument } from "../config/documents";
import AuthContext from "../context/auth-context";

export default function useLogin() {
  const context = useContext(AuthContext);

  const [login, { loading, data, error }] = useLazyQuery(loginDocument, {
    onCompleted: ({ login }) => {
      // Save authentication data and leave.
      context.login(login.token, login.userId, login.tokenExpiration);
    },
    onError: err => console.log(err.message)
  });

  return [login, { loading, data, error }];
}
