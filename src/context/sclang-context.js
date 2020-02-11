import React, { createContext, useReducer, useCallback, useEffect } from "react";
import { interpretWithSclang } from "../helpers/electron";

export const SClangContext = createContext({
  logs: [],
  evaluate: () => {}
});

function reducer(state, action) {
  switch(action.type) {
    case "add_log":
      return {
        ...state,
        logs: [
          ...state.logs,
          action.input,
          action.output
        ]
      }
    default:
      return state;
  }
}

const initialState = {
  logs: []
}

export function SClangProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const evaluate = useCallback(
    async (text) => {
      try {
        console.log("evaluating ", text);
        const input = { type: "stdin", value: text };

        const response = await interpretWithSclang(text);
        const output = { type: "stdout", value: JSON.stringify(response) }

        dispatch({ type: "add_log", input, output });
      } catch (err) {
        console.error(err);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    console.log('evaluate re-rendered');
  }, [evaluate])

  return (
    <SClangContext.Provider value={{ state, evaluate }}>
      {children}
    </SClangContext.Provider>
  );
}
