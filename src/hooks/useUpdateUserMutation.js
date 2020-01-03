import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER_MUTATION } from '../data/api';

export default function useCreateUserMutation() {
   const [updateUser, {data, loading, errors}] = useMutation(
      UPDATE_USER_MUTATION, 
      {
        onCompleted: ({ updateUser }) => {
          console.log('Success', updateUser);
        }
      }
    );

    return [updateUser, {data, loading, errors}]
} 