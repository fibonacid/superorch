import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { userDocument } from "../config/documents";

export default function useUsername() {
  const [name, setName] = useState("");
  const { data } = useQuery(userDocument);

  useEffect(() => {
    if (data && data.user) {
      setName(data.user.firstName || data.user.name);
    }
  }, [data]);

  return name;
}
