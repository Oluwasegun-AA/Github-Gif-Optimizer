import React from 'react';
import PropTypes from 'prop-types';

const ItemsWithError = ({ name }) => <div className="items">{name}</div>;

const NotificationModal = ({ message = '', className = '', items }) => {
  const getItems = () => items.map(({ name }) => <ItemsWithError name={name} />);

  return (
    <div className={`modal ${className}`}>
      <span className="message">
        {message}
        {!!items && items.length > 1 && getItems()}
      </span>
    </div>
  );
};

NotificationModal.propTypes = {
  message: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string.isRequired,
};

ItemsWithError.propTypes = {
  name: PropTypes.string.isRequired,
};

export default NotificationModal;
