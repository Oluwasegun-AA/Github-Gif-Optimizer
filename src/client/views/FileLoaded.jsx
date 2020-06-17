import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ClipsPreview, UploadInput } from '../components/index';
import { deleteFile } from '../actions/index';

const FileLoaded = props => {
  const {
    file: { isLoaded, fileInfo }, remove
  } = props;

  const handleOnCancle = e => {
    const item = e.target.id;
    return remove(item);
  };

  return (
    <div className="container">
      <UploadInput {...props} />
      {isLoaded && !!fileInfo.length && (
        <ClipsPreview
          convertOnClick={e => console.log('convert', e.target.id)}
          CancelOnClick={e => console.log('cancle', e.target.id)}
          handleOnCancle={handleOnCancle}
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
  remove: deleteFile,
};

FileLoaded.propTypes = {
  remove: PropTypes.func.isRequired,
  file: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FileLoaded);
