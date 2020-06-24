import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';
import Clip from './Clip';
import {
  getType, getName, getSize, getDuration
} from '../../common/index';
import { saveConversionProgress, removeProgressListener } from '../actions';

const ClipsPreview = props => {
  const {
    handleOnClearAll,
    handleOnCancle,
    handleOnConvert,
    handleOnPreview,
    handleOnPreviewExit,
    saveConversionProgress,
    handleOnOpenInFolder,
    file: { filesInfo, isPreview },
  } = props;

  const getItems = useMemo(() => {
    let files;
    if (filesInfo.length && !isPreview) {
      files = filesInfo.map(
        ({
          name,
          duration,
          type,
          size,
          progress,
          isConversionStart,
          isConverting,
          isFilePreview,
          isConversionComplete
        }) => (
          <Clip
            name={getName(name)}
            duration={getDuration(duration)}
            type={getType(type)}
            size={getSize(size)}
            id={name}
            key={name}
            handleOnCancle={handleOnCancle}
            progress={progress}
            isConversionStart={isConversionStart}
            isConverting={isConverting}
            isFilePreview={isFilePreview}
            handleOnPreview={handleOnPreview}
            isConversionComplete={isConversionComplete}
            handleOnOpenInFolder={handleOnOpenInFolder}
          />
        )
      );
    }
    if (filesInfo.length && isPreview) {
      files = filesInfo.map(
        ({
          name,
          duration,
          type,
          size,
          progress,
          isConverting,
          isFilePreview,
          isConversionStart,
          isConversionComplete
        }) => isFilePreview && (
        <Clip
          name={getName(name)}
          duration={getDuration(duration)}
          type={getType(type)}
          size={getSize(size)}
          id={name}
          key={name}
          handleOnCancle={handleOnCancle}
          progress={progress}
          isConversionStart={isConversionStart}
          isConverting={isConverting}
          isFilePreview={isFilePreview}
          handleOnPreviewExit={handleOnPreviewExit}
          isConversionComplete={isConversionComplete}
          handleOnOpenInFolder={handleOnOpenInFolder}
          {...props}
        />
        )
      );
    }
    return files;
  }, [filesInfo]);

  useEffect(() => {
    saveConversionProgress();

    return removeProgressListener();
  }, [filesInfo]);

  return (
    <div className="loadedSection">
      <div className="clipDetails">{getItems}</div>

      <div className="clipsFooter">
        <Button
          value="CLEAR ALL"
          className="btn--red"
          onClick={handleOnClearAll}
        />
        <Button
          value="CONVERT"
          className="btn--green"
          onClick={handleOnConvert}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  saveConversionProgress,
};

ClipsPreview.propTypes = {
  handleOnConvert: PropTypes.func.isRequired,
  handleOnClearAll: PropTypes.func.isRequired,
  handleOnCancle: PropTypes.func.isRequired,
  handleOnPreviewExit: PropTypes.func.isRequired,
  handleOnOpenInFolder: PropTypes.func.isRequired,
  handleOnPreview: PropTypes.func.isRequired,
  saveConversionProgress: PropTypes.func.isRequired,
  isConversionStart: PropTypes.bool.isRequired,
  file: PropTypes.any.isRequired,
};

export default connect(
  null,
  mapDispatchToProps
)(ClipsPreview);
