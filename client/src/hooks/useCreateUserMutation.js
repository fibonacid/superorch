import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER_MUTATION } from "../data/api";
import AuthContext from "../context/auth-context";

export default function useCreateUserMutation() {
  const context = useContext(AuthContext);

  const [createUser, { data, loading, error }] = useMutation(
    CREATE_USER_MUTATION,
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
