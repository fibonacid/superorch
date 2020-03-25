import { createPortal } from "react-dom";
import usePortal from "../../../hooks/usePortal";

// https://www.jayfreestone.com/writing/react-portals-with-hooks/

/**
 * @example
 * <Portal>
 *   <p>Thinking with portals</p>
 * </Portal>
 */
const Portal = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(children, target);
};

export default Portal;
