import React, { createContext, useState, useCallback } from "react";
import { interpretWithSclang } from "../helpers/electron";

export const SClangContext = createContext({
  logs: [],
  evaluate: () => {}
});

export function SClangProvider({ children }) {
  const [logs, setLogs] = useState([]);

  const evaluate = useCallback(
    async function(text) {
      try {
        console.log("evaluating ", text);
        const input = { type: "stdin", value: text };

        const response = await interpretWithSclang(text);
        const output = { type: "stdout", value: JSON.stringify(response) }

        setLogs([...logs, input, output]);
      } catch (err) {
        console.error(err);
      }
    },
    [logs, setLogs]
  );

  return (
    <SClangContext.Provider value={{ logs, evaluate }}>
      {children}
    </SClangContext.Provider>
  );
}
