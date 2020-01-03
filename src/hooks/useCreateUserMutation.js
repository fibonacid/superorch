
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER_MUTATION } from '../data/api';

export default function useCreateUserMutation() {
   const [createUser, {data, loading, errors}] = useMutation(
      CREATE_USER_MUTATION, 
      {
        onCompleted: ({ createUser }) => {
          console.log('Success', createUser._id);
        }
      }
    );

    return [createUser, {data, loading, errors}]
} 