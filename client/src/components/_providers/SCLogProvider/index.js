import React, { useState, useMemo } from "react";
import SCLogContext from "../../../context/sclog-context";

const initialState = [
  { type: "stdin", value: "2 + 2" },
  { type: "stdout", value: "4" }
];

export default function SCLogProvider(props) {
  const [lines, setLines] = useState(initialState);

  const pushLine = line => {
    setLines([...lines, line]);
  };

  const clearLines = () => {
    setLines([]);
  };

  return (
    <SCLogContext.Provider
      value={{
        lines,
        pushLine,
        clearLines
      }}
    >
      {props.children}
    </SCLogContext.Provider>
  );
}
