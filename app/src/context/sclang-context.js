import React, { createContext, useReducer, useCallback } from "react";
import { interpretWithSclang } from "../helpers/electron";

export const SClangContext = createContext({
  logs: [],
  evaluate: () => {}
});

function reducer(state, action) {
  switch (action.type) {
    case "add_log":
      return {
        ...state,
        logs: [...state.logs, action.input, action.output]
      };
    case "clear_log":
      return {
        ...state,
        logs: []
      };
    default:
      return state;
  }
}

const initialState = {
  logs: []
};

export function SClangProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const evaluate = useCallback(
    async text => {
      const input = { type: "stdin", value: text };
      try {
        console.log("evaluating ", text);
        const response = await interpretWithSclang(text);
        const output = { type: "stdout", value: JSON.stringify(response) };

        dispatch({ type: "add_log", input, output });
      } catch (err) {
        const output = { type: "stdout", value: err.message };
        dispatch({ type: "add_log", input, output });
      }
    },
    [dispatch]
  );

  return (
    <SClangContext.Provider value={{ state, dispatch, evaluate }}>
      {children}
    </SClangContext.Provider>
  );
}
