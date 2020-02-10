import React, { createContext, useState } from 'react';

export const createFlashMessage = (value="Oops, empty message", options={}) => ({
   type: "info",
   disappear: true,
   ...options,
   value
})

export const FlashMessageContext = createContext({
   messages: []
});

const defaultMessages = [
   { _id: 0, ...createFlashMessage() },
   { _id: 1, ...createFlashMessage() }
]

export function FlashMessageProvider({ children }) {
   const [counter, setCounter] = useState(1);
   const [messages, setMessages] = useState(defaultMessages);

   return (
      <FlashMessageContext.Provider
         value={{
            messages
         }}
      >
      {children}
    </FlashMessageContext.Provider>
   )
}