import { createContext } from "react";

const OrchestraContext = createContext({
  orchestra: null,
  setOrchestra: () => {}
});

export default OrchestraContext;
