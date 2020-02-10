import React, { createContext, useState, useCallback } from "react";

export const FlashMessageContext = createContext({
  messages: [],
  removeMessage: id => {},
  addMessage: (values, options) => {}
});

let counter = -1;

export function FlashMessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const createMessage = useCallback(
    (value = "Oops, empty message", options = {}) => {
       counter++;
       return {
         type: "info",
         disappear: true,
         ...options,
         value,
         id: counter
       }
    },
    [messages, counter]
  );

  const addMessage = useCallback(
    function(value, options) {
      const message = createMessage(value, options);
      setMessages([message, ...messages].splice(0, 4));
      return message;
    },
    [messages, setMessages, createMessage, counter]
  );

  const removeMessage = useCallback(
    function(id) {
      setMessages(messages.filter(message => message.id !== id));
      return id;
    },
    [messages, setMessages]
  );

  return (
    <FlashMessageContext.Provider
      value={{
        messages,
        addMessage,
        removeMessage
      }}
    >
      {children}
    </FlashMessageContext.Provider>
  );
}
