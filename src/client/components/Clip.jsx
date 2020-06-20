/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const Clip = ({
  name,
  duration,
  type,
  size,
  id,
  key,
  handleOnCancle,
  progress,
  isConverting,
  isFilePreview,
  handleOnPreview,
  handleOnPreviewExit,
  isConversionComplete,
  handleOnOpenInFolder,
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
    {isConverting && !isConversionComplete && (
      <div className="progress">
        <span>Converting:</span>
        <span>{`  ${progress}%`}</span>
      </div>
    )}
    {isConversionComplete && (
      <div className="progress done">
        <strong>Done</strong>
      </div>
    )}
    {isFilePreview ? (
      <Button
        className="btn--green preview"
        onClick={handleOnPreviewExit}
        id={id}
        value="Exit Preview"
      />
    ) : isConversionComplete ? (
      <Button
        className="btn--green preview"
        onClick={handleOnOpenInFolder}
        id={id}
        value="Open Folder"
      />
    ) : (
      <Button
        className="btn--green preview"
        onClick={handleOnPreview}
        id={id}
        value="Preview"
      />
    )}
  </div>
);

Clip.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired,
  isConverting: PropTypes.bool.isRequired,
  isFilePreview: PropTypes.bool.isRequired,
  isConversionComplete: PropTypes.bool.isRequired,
  handleOnCancle: PropTypes.func.isRequired,
  handleOnPreview: PropTypes.func.isRequired,
  handleOnPreviewExit: PropTypes.func.isRequired,
  handleOnOpenInFolder: PropTypes.func.isRequired,
};

export default Clip;
