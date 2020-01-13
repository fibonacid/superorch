import React from "react";
import ItemIcon from "./ItemIcon";

function SelectorIcon({ orchestra }) {
  if (!orchestra) {
    return null;
  }
  const letter = orchestra.name.charAt(0);

  return <ItemIcon letter={letter} />;
}

export default SelectorIcon;
