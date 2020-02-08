import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_QUERY } from "../api/auth";
import { AuthContext } from "../context/auth-context";

export default function useRegister() {
  const context = useContext(AuthContext);

  const [mutate, { data, loading, error }] = useMutation(REGISTER_QUERY, {
    onCompleted: ({ register }) => {
      console.log("Success", register.token);
      // Save authentication data and leave.
      context.login(register.token, register.userId, register.tokenExpiration);
    },
    onError: err => console.log(err.message)
  });

  return [mutate, { data, loading, error }];
}
