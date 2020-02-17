import { useQuery } from "@apollo/react-hooks";
import { GET_ORCHESTRA_QUERY } from "../api/orchestras";

export default function useOrchestra(orchestraId) {
  return useQuery(GET_ORCHESTRA_QUERY, {
    variables: {
      orchestraId
    },
    skip: !orchestraId
  });
}
