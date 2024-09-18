import PropTypes from "prop-types";
import { forwardRef } from "react";
const Select = forwardRef(function Select({ styles, options }, ref) {
  return (
    <select ref={ref} className={styles} required>
      {options.length > 0 ? (
        options.map((opt, index) => {
          return <option key={index}>{opt}</option>;
        })
      ) : (
        <option>No Categories</option>
      )}
    </select>
  );
});
Select.propTypes = {
  styles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};
export default Select;
Select.propTypes = {
  styles: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};
