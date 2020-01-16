import React, { useState } from "react";
import SelectionContext from "../../../context/selection-context";

export default function SelectionProvider(props) {
  const orchestra = useState(null);

  return (
    <SelectionContext.Provider
      value={{
        orchestra: selection(orchestra)
      }}
    >
      {props.children}
    </SelectionContext.Provider>
  );
}

function selection(arr) {
  return {
    id: arr[0],
    select: arr[1]
  };
}
