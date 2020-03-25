import { useLocation } from "react-router-dom";

export default function useSearchParams() {
  return new URLSearchParams(useLocation().search);
}
