import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import Clip from './Clip';

const ClipsPreview = ({
  convertOnClick,
  CancelOnClick,
  file,
  handleOnCancle,
}) => {
  const { fileInfo } = file;

  const getType = type => (type.substring(6) === 'quicktime' ? 'mov' : type.substring(6));
  const getSize = size => (size / 10 ** 6).toFixed(2);
  const getDuration = duration => {
    const hours = Math.floor(duration / 3600);
    duration %= 3600;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${hours}:${minutes}:${seconds}`;
  };
  const getName = name => {
    const trimmedName = name.substring(0, 13);
    return trimmedName === name ? `${trimmedName}` : `${trimmedName}...`;
  };

  const getItems = useMemo(() => {
    let files;
    if (fileInfo.length) {
      files = fileInfo.map(({
        name, duration, type, size
      }) => (
        <Clip
          name={getName(name)}
          duration={getDuration(duration)}
          type={getType(type)}
          size={getSize(size)}
          id={name}
          key={name}
          handleOnCancle={handleOnCancle}
        />
      ));
    }
    return files;
  }, [fileInfo]);

  return (
    <div className="loadedSection">
      <div className="clipDetails">{getItems}</div>

      <div className="clipsFooter">
        <Button
          value="CANCEL"
          className="fileHeading btn--red"
          onClick={convertOnClick}
          id="can"
        />
        <Button
          value="CONVERT"
          className="sizeHeading btn--green"
          onClick={CancelOnClick}
          id="con"
        />
      </div>
    </div>
  );
};

ClipsPreview.propTypes = {
  convertOnClick: PropTypes.func.isRequired,
  CancelOnClick: PropTypes.func.isRequired,
  handleOnCancle: PropTypes.func.isRequired,
  file: PropTypes.any.isRequired,
};

export default ClipsPreview;
