import { createContext } from "react";

const ActivityContext = createContext({
  orchestra: null,
  selectOrchestra: id => {}
});

export default ActivityContext;
