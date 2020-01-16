import { createContext } from "react";

const SelectionContext = createContext({
  orchestra: {
    id: null,
    select: id => {}
  }
});

export default SelectionContext;
