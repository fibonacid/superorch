import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { registerDocument } from "../data/documents";
import AuthContext from "../context/auth-context";

export default function useRegister() {
  const context = useContext(AuthContext);

  const [register, { data, loading, error }] = useMutation(registerDocument, {
    onCompleted: ({ register }) => {
      console.log("Success", register.token);
      // Save authentication data and leave.
      context.login(register.token, register.userId, register.tokenExpiration);
    },
    onError: err => console.log(err.message)
  });

  return [register, { data, loading, error }];
}
