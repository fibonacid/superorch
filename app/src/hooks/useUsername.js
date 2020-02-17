import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER_QUERY } from "../api/users";

export default function useUsername() {
  const [name, setName] = useState("");
  const { data } = useQuery(GET_USER_QUERY);

  useEffect(() => {
    if (data && data.user) {
      setName(data.user.firstName || data.user.name);
    }
  }, [data]);

  return name;
}
