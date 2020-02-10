import React, { createContext, useState, useCallback } from "react";

export const FlashMessageContext = createContext({
  messages: [],
  removeMessage: id => {},
  addMessage: (values, options) => {}
});

export function FlashMessageProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const createMessage = useCallback(
    (value = "Oops, empty message", options = {}) => ({
      type: "info",
      disappear: true,
      ...options,
      id: messages.length,
      value
    }),
    [messages]
  );

  const addMessage = useCallback(
     function(value, options) {
        const message = createMessage(value, options);
        setMessages([
           message,
           ...messages,
        ]);
        return message;
     },
     [messages, setMessages, createMessage]
  )

  const removeMessage = useCallback(
     function(id) {
        setMessages(
           messages.filter(message => message.id !== id)
        )
        return id;
     },
     [messages, setMessages]
  )


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
