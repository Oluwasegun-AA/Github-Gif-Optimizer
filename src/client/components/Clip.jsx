import React from 'react';
import PropTypes from 'prop-types';

const Clip = ({
  name, duration, type, size, id, key, handleOnCancle
}) => (
  <div className="singleClip" key={key}>
    <span className="cancleBtn" id={id} onClick={handleOnCancle}>
      <img src="../styles/images/cancel.svg" alt="" />
    </span>
    <div className="clip">
      <div className="clipName">
        {name}
        {' '}
        (
        {type}
        {','}
        {' '}
        {size}
        mb)
      </div>
      <div className="clipDuration">{duration}</div>
    </div>
    <div className="size">
      <span>output size:</span>
      <input type="number" min="1" />
      <span>MB</span>
    </div>
  </div>
);

Clip.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  handleOnCancle: PropTypes.func.isRequired,
};

export default Clip;
