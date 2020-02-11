import React, { createContext, useReducer } from "react";

export const FlashMessageContext = createContext({
  messages: [],
  removeMessage: id => {},
  addMessage: (values, options) => {}
});

const defaultMessage = {
  type: "info"
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      const message = {
        ...defaultMessage,
        ...action.message,
        id: state.length
      };
      return [...state, message].splice(0, 4);
    case "remove":
      return state.filter(message => message.id !== action.id);
    default:
      return state;
  }
}

export function FlashMessageProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <FlashMessageContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </FlashMessageContext.Provider>
  );
}
