import { forwardRef } from "react";
import Proptypes from "prop-types";
import { createPortal } from "react-dom";
const Modal = forwardRef(function Modal({ styles, children }, ref) {
  return createPortal(
    <dialog className={`${styles} add-category-modal`} ref={ref}>
      {children}
    </dialog>,
    document.getElementById("modal-root")
  );
});
export default Modal;
Modal.propTypes = {
  styles: Proptypes.string,
  children: Proptypes.node,
};
