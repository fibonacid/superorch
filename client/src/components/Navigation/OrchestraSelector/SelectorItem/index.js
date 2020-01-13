import React, { useContext } from "react";
import ActivityContext from "../../../../context/activity-context";
import ItemIcon from "./ItemIcon";

function SelectorIcon({ orchestra }) {
  const { orchestra: activeId, selectOrchestra } = useContext(ActivityContext);

  function handleClick() {
    selectOrchestra(orchestra._id);
  }

  const letter = orchestra.name.charAt(0);

  return (
    <ItemIcon
      onClick={handleClick}
      letter={letter}
      active={orchestra._id === activeId}
    />
  );
}

export default SelectorIcon;
