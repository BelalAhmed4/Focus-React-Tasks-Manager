import PropTypes from "prop-types";
import { forwardRef } from "react";
const Button = forwardRef(function Button(
  { styles, children, handleClick, state, color },
  ref
) {
  return (
    <button
      ref={ref}
      onClick={handleClick ? (e) => handleClick(e) : null}
      className={`${styles} ${state ? `${color}` : ""}`}
      type="text">
      {children && <div>{children}</div>}
    </button>
  );
});
Button.propTypes = {
  children: PropTypes.node,
  styles: PropTypes.string,
  handleCLick: PropTypes.func,
};
Button.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node,
  handleClick: PropTypes.func,
  state: PropTypes.bool,
  color: PropTypes.string,
};
export default Button;
