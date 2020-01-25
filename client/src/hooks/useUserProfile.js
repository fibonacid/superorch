import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { userDocument } from "../config/documents";

export default function useRegister() {
  const [userProfile, setUserProfile] = useState(null);
  const { data } = useQuery(userDocument);

  useEffect(
    function() {
      if (data) {
        console.log(data);
        setUserProfile({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          city: data.user.city,
          birthdate: data.user.birthdate,
          bio: data.user.bio
        });
      }
    },
    [data]
  );

  return userProfile;
}
