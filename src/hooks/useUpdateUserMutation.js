import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_MUTATION } from '../data/api';

export default function useUpdateUserMutation() {
   const [updateUser, {data, loading, error}] = useMutation(
      UPDATE_USER_MUTATION, 
      {
        onCompleted: ({ updateUser }) => {
          console.log('Success', updateUser);
        },
        onError: err => console.log(err)
      }
    );

    return [updateUser, {data, loading, error}]
} 