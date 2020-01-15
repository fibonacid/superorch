import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { createUserDocument } from "../data/documents";
import AuthContext from "../context/auth-context";

export default function useRegister() {
  const context = useContext(AuthContext);

  const [createUser, { data, loading, error }] = useMutation(
    createUserDocument,
    {
      onCompleted: ({ createUser }) => {
        console.log("Success", createUser.token);
        // Save authentication data and leave.
        context.login(
          createUser.token,
          createUser.userId,
          createUser.tokenExpiration
        );
      },
      onError: err => console.log(err.message)
    }
  );

  return [createUser, { data, loading, error }];
}
