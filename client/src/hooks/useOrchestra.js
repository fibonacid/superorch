import { useQuery } from "@apollo/react-hooks";
import { orchestraDocument } from "../config/documents";

export default function useOrchestra(orchestraId) {
  return useQuery(orchestraDocument, {
    variables: {
      orchestraId
    },
    skip: !orchestraId
  });
}
