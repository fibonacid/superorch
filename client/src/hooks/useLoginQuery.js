import { useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOGIN_QUERY } from "../data/api";
import AuthContext from "../context/auth-context";

export default function useLoginQuery() {
  const context = useContext(AuthContext);

  const [login, { loading, data, error }] = useLazyQuery(LOGIN_QUERY, {
    onCompleted: ({ login }) => {
      console.log("Success", login.token);
      // Save authentication data and leave.
      context.login(login.token, login.userId, login.tokenExpiration);
    },
    onError: err => console.log(err.message)
  });

  return [login, { loading, data, error }];
}
