import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import uploadFile from '../actions/index';

/**
 * @description home view functional component
 * @param {*} props props passed down from parent
 */
function Home(props) {
  const [info, setInfo] = useState('');

  const onDrop = acceptedFiles => {
    console.log('jjjjj', acceptedFiles);
    const { path } = acceptedFiles[0];
    const { load } = props;
    load(path);
  };

  const getInfo = () => {
    const {
      file: { fileInfo },
    } = props;
    setInfo(`This file has a duration of ${fileInfo}`);
  };

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

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'video/*',
  });

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div className="container">
      <div className="content" {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="inputText">
          <p>
            {isDragAccept && <p>Drop file</p>}
            {isDragReject && <p>Oops! File not supported</p>}
            {!isDragActive && <p>Drop video files here or click to upload</p>}
          </p>
        </div>
      </div>

      <div className="loadedSection">
        <div className="clipDetails">
          <div className="singleClip">
            <span className="cancleBtn">
              <img src="../styles/images/cancel.svg" alt="" />
            </span>
            <div className="clip">
              <div className="clipName">video1 anme (mov, 25mb)</div>
              <div className="clipDuration">00:00:00</div>
            </div>
            <div className="size">
              <span>output size:</span>
              <input type="number" min="1" />
              <span>MB</span>
            </div>
          </div>

          <div className="singleClip">
            <span className="cancleBtn" />
            <div className="clip">
              <div className="clipName">video2 anme (mov, 25mb)</div>
              <div className="clipDuration">00:00:00</div>
            </div>
            <div className="size">
              <span>output size:</span>
              <input type="number" min="1" />
              <span>MB</span>
            </div>
          </div>

          <div className="singleClip">
            <span className="cancleBtn" />
            <div className="clip">
              <div className="clipName">video3 anme (mov, 25mb)</div>
              <div className="clipDuration">00:00:00</div>
            </div>
            <div className="size">
              <span>output size:</span>
              <input type="number" min="1" />
              <span>MB</span>
            </div>
          </div>
        </div>

        <div className="clipsFooter">
          <span className="fileHeading btn--red">CANCLE</span>
          <span className="sizeHeading btn--green">CONVERT</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  file: state.file,
});

const mapDispatchToProps = {
  load: uploadFile,
};

Home.propTypes = {
  load: PropTypes.func.isRequired,
  file: PropTypes.any.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

// reactDropZone
