import React, { useState, useMemo } from "react";
import SCLogContext from "../../../context/sclog-context";

export default function SCLogProvider(props) {
  const [lines, setLines] = useState([]);

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
