import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER_MUTATION } from "../api/users";

export default function useModifyUser() {
  const [updateUser, { data, loading, error }] = useMutation(
    UPDATE_USER_MUTATION
  );

  return [updateUser, { data, loading, error }];
}
