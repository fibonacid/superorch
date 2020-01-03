
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER_MUTATION } from '../data/api';

export default function useCreateUserMutation() {
   const [createUser, {data, loading, error}] = useMutation(
      CREATE_USER_MUTATION, 
      {
        onCompleted: ({ createUser }) => {
          console.log('Success', createUser._id);
        },
        onError: err => console.log(err.message) 
      }
    );

    return [createUser, {data, loading, error}]
} 