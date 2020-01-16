import { useContext } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { orchestraDocument } from "../data/documents";
import OrchestraContext from "../context/orchestra-context";

export default function useSelectOrchestra(orchestraId) {
  const context = useContext(OrchestraContext);

  const [fetchOrchestra] = useLazyQuery(orchestraDocument, {
    variables: {
      orchestraId
    },
    onCompleted: data => {
      // Save orchestra data
      context.setOrchestra(data.singleOrchestra);
    },
    onError: err => console.log(err.message)
  });

  return fetchOrchestra;
}
