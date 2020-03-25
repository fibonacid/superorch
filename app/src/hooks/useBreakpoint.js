import { useContext } from "react";
import { BreakpointContext } from "../context/breakpoint-context";

export default function useBreakpoint() {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error("useBreakpoint must be used within BreakpointProvider");
  }
  return context;
}
