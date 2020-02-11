import React, { createContext, useState, useCallback } from "react";
import { interpretWithSclang } from "../helpers/electron";

export const SClangContext = createContext({
  log: [],
  evaluate: () => {}
});

export function SClangProvider({ children }) {
  const [log, setLog] = useState([]);

  function pushLog(object) {
      setLog([...log, object]);
  };

  const evaluate = useCallback(
    async function(text) {
      try {
        console.log("evaluating ", text);
        pushLog({
          type: "stdin",
          value: text
        });

        const response = await interpretWithSclang(text);
        console.log(response);

        pushLog({
          type: "stdout",
          value: JSON.stringify(response)
        })
      } catch (err) {
        console.error(err);
      }
    },
    [log, pushLog]
  );

  return (
    <SClangContext.Provider value={{ log, evaluate }}>
      {children}
    </SClangContext.Provider>
  );
}
