import { useMutation } from "@apollo/react-hooks";
import { updateUserDocument } from "../data/documents";

export default function useModifyUser() {
  const [updateUser, { data, loading, error }] = useMutation(
    updateUserDocument,
    {
      onCompleted: ({ updateUser }) => {
        console.log("Success", updateUser);
      },
      onError: err => console.log(err.message)
    }
  );

  return [updateUser, { data, loading, error }];
}
