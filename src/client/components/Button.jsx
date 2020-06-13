import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  className, onClick, value, id
}) => (
  <span className={className} onClick={onClick} id={id}>
    {value}
  </span>
);

Button.propTypes = {
  className: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
