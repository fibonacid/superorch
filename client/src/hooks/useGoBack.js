import { useHistory } from "react-router-dom";

export default function useGoBack() {
  const history = useHistory();

  return e => {
    e.stopPropagation();
    history.goBack();
  };
}
