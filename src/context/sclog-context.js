import React, { useState, createContext } from "react";

export const SCLogContext = createContext({
  lines: [],
  pushLine: () => {},
  clearLine: () => {}
});

export function SCLogProvider(props) {
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
