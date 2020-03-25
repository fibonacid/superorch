import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_QUERY } from "../api/users";

export default function useRegister() {
  const [userProfile, setUserProfile] = useState(null);
  const { data } = useQuery(GET_USER_QUERY);

  useEffect(
    function() {
      if (data) {
        setUserProfile({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          city: data.user.city || "",
          birthdate: data.user.birthdate || "",
          bio: data.user.bio || ""
        });
      }
    },
    [data]
  );

  return userProfile;
}
