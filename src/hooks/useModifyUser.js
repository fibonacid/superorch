import { useMutation } from "@apollo/react-hooks";
import { updateUserDocument } from "../config/documents";

export default function useModifyUser() {
  const [updateUser, { data, loading, error }] = useMutation(
    updateUserDocument
  );

  return [updateUser, { data, loading, error }];
}
