import React from "react";
import useSelectOrchestra from "../../../../hooks/useSelectOrchestra";
import { useHistory } from "react-router-dom";
import ItemIcon from "./ItemIcon";

function SelectorIcon({ orchestra, currentId }) {
  const selectOrchestra = useSelectOrchestra(orchestra._id);

  const history = useHistory();
  function handleClick() {
    selectOrchestra();

    history.push("/");
  }

  const letter = orchestra.name.charAt(0);

  return (
    <ItemIcon
      onClick={handleClick}
      letter={letter}
      active={orchestra._id === currentId}
    />
  );
}

export default SelectorIcon;
