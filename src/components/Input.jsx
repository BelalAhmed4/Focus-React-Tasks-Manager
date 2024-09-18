import { forwardRef } from "react";
import PropTypes from "prop-types";
const Input = forwardRef(function Input(
  { styles, placeHolder, value, handleBlur, ...props },
  ref
) {
  return (
    <>
      <input
        ref={ref}
        className={`${styles}`}
        type="text"
        placeholder={placeHolder}
        defaultValue={value}
        onBlur={handleBlur}
        required
        {...props}
      />
    </>
  );
});
export default Input;
Input.propTypes = {
  styles: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  handleBlur: PropTypes.func,
};
