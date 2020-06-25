import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { ClipsPreview, UploadInput, VideoPreview } from '../components/index';
import {
  deleteFile,
  previewFile,
  cancleFilePreview,
  clearAllFiles,
} from '../actions/index';
import { client, evt } from '../../common/index';

const FileLoaded = props => {
  const {
    file: { filesInfo, isPreview },
    clear,
    remove,
    previewFile,
    canclePreview,
  } = props;

  const handleOnConvert = () => {
    const validData = filesInfo.filter(
      ({ isConversionComplete }) => isConversionComplete === false
    );
    client.send(evt.CONVERT, validData);
  };
  const handleOnCancle = e => {
    const item = e.target.id;
    return remove(item);
  };

  const handleOnPreview = e => {
    previewFile(e.target.id);
  };

  const handleOnPreviewCancle = e => {
    canclePreview(e.target.id);
  };

  const handleOnOpenInFolder = e => {
    const { path } = find(filesInfo, { name: e.target.id });
    client.send(evt.OPEN_IN_FOLDER, path);
  };

  return (
    <div className="container">
      {isPreview && filesInfo.length ? (
        <VideoPreview {...props} />
      ) : (
        <UploadInput {...props} />
      )}
      {!!filesInfo.length && (
        <ClipsPreview
          handleOnConvert={handleOnConvert}
          handleOnClearAll={() => clear()}
          handleOnPreview={handleOnPreview}
          handleOnCancle={handleOnCancle}
          handleOnPreviewExit={handleOnPreviewCancle}
          handleOnOpenInFolder={handleOnOpenInFolder}
          {...props}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  file: state.file,
});

const mapDispatchToProps = {
  previewFile,
  canclePreview: cancleFilePreview,
  remove: deleteFile,
  clear: clearAllFiles,
};

FileLoaded.propTypes = {
  remove: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  previewFile: PropTypes.func.isRequired,
  canclePreview: PropTypes.func.isRequired,
  file: PropTypes.any.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileLoaded);
