import { useContext } from "react";
import { FlashMessageContext } from "../context/flash-message-context";

function useFlashMessages() {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error(
      "useFlashMessages must be used within FlashMessageProvider"
    );
  }
  return context;
}

export default useFlashMessages;
