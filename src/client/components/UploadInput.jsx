import React, { useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import { uploadFile, removeDuplicateToast, removeInfoListener } from '../actions/index';
import { client, evt } from '../../common/index';
import NotificationModal from './NotificationModal';

const UploadInput = props => {
  const {
    loadFiles,
    removeDuplicateToast,
    files: { isDuplicate, duplicates },
  } = props;

  const onDrop = useCallback(acceptedFiles => {
    const data = acceptedFiles.map(data => pick(data, ['path', 'name', 'size', 'type']));
    if (data.length) client.send(evt.UPLOAD, data);
  }, []);

  useEffect(() => {
    loadFiles();
    return removeInfoListener();
  }, [loadFiles]);

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({
    onDropAccepted: onDrop,
    accept: 'video/*',
  });

  const base = {
    animation: 'none',
  };

  const activeStyle = {
    borderColor: '#2196f3',
    ...base,
  };

  const acceptStyle = {
    borderColor: '#00e676',
    backgroundColor: 'green',
    ...base,
  };

  const rejectStyle = {
    borderColor: '#ff1744',
    backgroundColor: 'rgb(203, 71, 71)',
    animation: 'jumpingText 4s infinite linear',
    ...base,
  };

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [[
      isDragActive,
      isDragReject,
      isDragAccept,
    ]]
  );

  const getMessageAndStyle = () => {
    removeDuplicateToast();
    return {
      className: isDuplicate ? 'animate' : '',
      message:
        duplicates.length > 1
          ? 'The following files have already been added'
          : `File "${duplicates[0].name}" has already been added`,
    };
  };

  return (
    <div className="content" {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <div className="inputText">
        {isDuplicate && duplicates.length !== 0 && (
          <NotificationModal {...getMessageAndStyle()} items={duplicates} />
        )}
        <p>
          {isDragAccept && <p>Drop file</p>}
          {isDragReject && <p>Oops! File not supported</p>}
          {!isDragActive && <p>Drop video files here or click to upload</p>}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  files: state.file,
});

const mapDispatchToProps = {
  loadFiles: uploadFile,
  removeDuplicateToast,
};

UploadInput.propTypes = {
  loadFiles: PropTypes.func.isRequired,
  removeDuplicateToast: PropTypes.func.isRequired,
  isDuplicate: PropTypes.bool.isRequired,
  files: PropTypes.arrayOf(PropTypes.object),
  duplicates: PropTypes.arrayOf(PropTypes.string),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadInput);
