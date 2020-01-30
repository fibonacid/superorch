import { createContext } from "react";

const InterpreterContext = createContext({
  lines: [],
  pushLine: () => {},
  clearLine: () => {}
});

export default InterpreterContext;
